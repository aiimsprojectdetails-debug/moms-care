"use client";

import { useState } from "react";

import {
  FaSearch,
  FaIdCard,
  FaPhone,
  FaUser,
  FaHospital,
  FaTimes,
} from "react-icons/fa";

export default function PatientSearch({ onSearch }) {
  const [searchType, setSearchType] = useState("aadhaar");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (!searchValue.trim()) {
      alert("Please enter a search value.");
      return;
    }

    if (onSearch) {
      onSearch({
        type: searchType,
        value: searchValue,
      });
    }

    console.log({
      type: searchType,
      value: searchValue,
    });
  };

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <div className="flex items-center gap-3 mb-6">

        <FaSearch className="text-pink-600 text-3xl" />

        <div>

          <h2 className="text-3xl font-bold text-pink-600">

            Search Patient

          </h2>

          <p className="text-gray-500">

            Search using Aadhaar, Mobile, Name or Hospital ID

          </p>

        </div>

      </div>

      {/* Search Type */}

      <div className="grid md:grid-cols-4 gap-5">

        <button
          onClick={() => setSearchType("aadhaar")}
          className={`rounded-xl p-4 flex flex-col items-center transition ${
            searchType === "aadhaar"
              ? "bg-pink-600 text-white"
              : "bg-pink-50 text-pink-600"
          }`}
        >
          <FaIdCard size={28} />

          <span className="mt-2">

            Aadhaar

          </span>

        </button>

        <button
          onClick={() => setSearchType("mobile")}
          className={`rounded-xl p-4 flex flex-col items-center transition ${
            searchType === "mobile"
              ? "bg-pink-600 text-white"
              : "bg-pink-50 text-pink-600"
          }`}
        >
          <FaPhone size={28} />

          <span className="mt-2">

            Mobile

          </span>

        </button>

        <button
          onClick={() => setSearchType("name")}
          className={`rounded-xl p-4 flex flex-col items-center transition ${
            searchType === "name"
              ? "bg-pink-600 text-white"
              : "bg-pink-50 text-pink-600"
          }`}
        >
          <FaUser size={28} />

          <span className="mt-2">

            Name

          </span>

        </button>

        <button
          onClick={() => setSearchType("hospitalId")}
          className={`rounded-xl p-4 flex flex-col items-center transition ${
            searchType === "hospitalId"
              ? "bg-pink-600 text-white"
              : "bg-pink-50 text-pink-600"
          }`}
        >
          <FaHospital size={28} />

          <span className="mt-2">

            Hospital ID

          </span>

        </button>

      </div>

      {/* Search Box */}

      <div className="mt-8 flex gap-4">

        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={`Enter ${searchType}`}
          className="flex-1 border rounded-xl p-4 outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          onClick={handleSearch}
          className="bg-pink-600 hover:bg-pink-700 text-white px-8 rounded-xl flex items-center gap-3"
        >
          <FaSearch />

          Search

        </button>

        <button
          onClick={clearSearch}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 rounded-xl"
        >
          <FaTimes />
        </button>

      </div>

      {/* Search Hint */}

      <div className="mt-8 bg-pink-50 rounded-2xl p-5">

        <h3 className="font-semibold text-pink-600">

          Search Examples

        </h3>

        <ul className="mt-3 space-y-2 text-gray-600">

          <li>• Aadhaar : 123456789012</li>

          <li>• Mobile : 9876543210</li>

          <li>• Name : Priya Sharma</li>

          <li>• Hospital ID : MC-2026-0001</li>

        </ul>

      </div>

    </div>
  );
}