import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import Client, create_client

load_dotenv()

app = Flask(__name__)

CORS(
    app,
    origins=["http://localhost:5173"],
)

supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")

if not supabase_url or not supabase_key:
    raise RuntimeError(
        "SUPABASE_URL and SUPABASE_KEY must be set in backend/.env"
    )

supabase: Client = create_client(
    supabase_url,
    supabase_key,
)


@app.get("/api/health")
def health_check():
    return jsonify(
        {
            "message": "Backend is working",
        }
    ), 200


@app.get("/api/database-check")
def database_check():
    try:
        response = (
            supabase.table("assessment_results")
            .select("id")
            .limit(1)
            .execute()
        )

        return jsonify(
            {
                "message": "Supabase connection is working",
                "data": response.data,
            }
        ), 200

    except Exception as error:
        app.logger.exception("Supabase connection failed")

        return jsonify(
            {
                "error": "Supabase connection failed",
                "details": str(error),
            }
        ), 500


@app.post("/api/assessments")
def create_assessment():
    data = request.get_json(silent=True)

    if not data:
        return jsonify(
            {
                "error": "A JSON request body is required",
            }
        ), 400

    required_fields = [
        "personalityType",
        "matchedPersonalityType",
        "companionName",
        "percentages",
    ]

    missing_fields = [
        field
        for field in required_fields
        if field not in data
    ]

    if missing_fields:
        return jsonify(
            {
                "error": "Missing required fields",
                "fields": missing_fields,
            }
        ), 400

    percentages = data["percentages"]

    required_percentage_keys = [
        "E",
        "I",
        "S",
        "N",
        "T",
        "F",
        "J",
        "P",
    ]

    missing_percentages = [
        key
        for key in required_percentage_keys
        if key not in percentages
    ]

    if missing_percentages:
        return jsonify(
            {
                "error": "Missing personality percentages",
                "fields": missing_percentages,
            }
        ), 400

    assessment_record = {
        "personality_type": data["personalityType"],
        "matched_personality_type": data[
            "matchedPersonalityType"
        ],
        "companion_name": data["companionName"],
        "extraversion": percentages["E"],
        "introversion": percentages["I"],
        "sensing": percentages["S"],
        "intuition": percentages["N"],
        "thinking": percentages["T"],
        "feeling": percentages["F"],
        "judging": percentages["J"],
        "perceiving": percentages["P"],
    }

    try:
        response = (
            supabase.table("assessment_results")
            .insert(assessment_record)
            .execute()
        )

        return jsonify(response.data[0]), 201

    except Exception as error:
        app.logger.exception("Failed to save assessment")

        return jsonify(
            {
                "error": "The assessment could not be saved",
                "details": str(error),
            }
        ), 500


@app.get("/api/assessments")
def get_assessments():
    try:
        response = (
            supabase.table("assessment_results")
            .select("*")
            .order("created_at", desc=True)
            .execute()
        )

        return jsonify(response.data), 200

    except Exception as error:
        app.logger.exception(
            "Failed to retrieve assessment history"
        )

        return jsonify(
            {
                "error": "Assessment history could not be retrieved",
                "details": str(error),
            }
        ), 500


if __name__ == "__main__":
    app.run(
        debug=True,
        port=5000,
    )