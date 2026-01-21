// Frontend/src/pages/Settings/ClinicProfileSetup.jsx
import { useState, useEffect } from "react";
import { Save, AlertCircle, Loader, RefreshCw, Edit, X } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ClinicProfileSetup() {
  const [profileData, setProfileData] = useState({
    clinicName: "",
    address: "",
    panNumber: "",
    registrationNumber: "",
    doctor1Name: "",
    doctor1RegNumber: "",
    doctor1Qualification: "",
    doctor1Mobile: "",
    doctor2Name: "",
    doctor2RegNumber: "",
    doctor2Qualification: "",
    doctor2Mobile: "",
    phone: "",
    email: "",
    website: "",
    patientSignatureLabel: "Patient / Representative",
    doctorSignatureLabel: "Doctor",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // ✅ Edit mode state

  // Load profile on mount
  useEffect(() => {
    checkAndLoadProfile();
  }, []);

  const checkAndLoadProfile = async () => {
    setLoading(true);
    try {
      console.log("🔍 Checking if profile exists...");
      console.log("API URL:", `${API_URL}/api/clinic-profile/exists`);

      const existsResponse = await axios.get(
        `${API_URL}/api/clinic-profile/exists`,
      );
      console.log("Exists response:", existsResponse.data);

      if (existsResponse.data.exists) {
        setProfileExists(true);
        setIsEditMode(false); // ✅ Disable edit mode when loading
        console.log("📥 Loading existing profile...");

        const response = await axios.get(`${API_URL}/api/clinic-profile`);
        console.log("Profile data:", response.data);

        if (response.data.success) {
          setProfileData(response.data.data);
        }
      } else {
        // No profile exists - enable edit mode for creation
        setIsEditMode(true);
      }
    } catch (err) {
      console.error("❌ Error loading profile:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      if (err.response?.status === 404) {
        console.log("✅ No profile found - will create new");
        setIsEditMode(true); // Enable edit mode for new profile
      } else {
        alert(
          "Error loading profile: " +
            (err.response?.data?.message || err.message),
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!profileData.clinicName)
      newErrors.clinicName = "Clinic name is required";
    if (!profileData.address) newErrors.address = "Address is required";
    if (!profileData.doctor1Name)
      newErrors.doctor1Name = "Doctor 1 name is required";
    if (!profileData.phone) newErrors.phone = "Phone number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitLoading(true);

    try {
      console.log("💾 Saving profile...");
      console.log("API URL:", `${API_URL}/api/clinic-profile`);
      console.log("Profile data:", profileData);

      const response = await axios.post(
        `${API_URL}/api/clinic-profile`,
        profileData,
      );
      console.log("Save response:", response.data);

      if (response.data.success) {
        alert(
          profileExists
            ? "Clinic Profile Updated Successfully! ✅"
            : "Clinic Profile Created Successfully! ✅",
        );

        // ✅ Exit edit mode and reload
        setProfileExists(true);
        setIsEditMode(false);
        await checkAndLoadProfile();

        // Reload page to update sidebar and header
        window.location.reload();
      }
    } catch (err) {
      console.error("❌ Error saving profile:", err);
      console.error("Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        url: err.config?.url,
      });

      alert(
        "Failed to save clinic profile: " +
          (err.response?.data?.message || err.message),
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleRefresh = () => {
    checkAndLoadProfile();
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    checkAndLoadProfile(); // Reload original data
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="ml-3 text-gray-600">Loading clinic profile...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-start justify-between bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-800">
                {profileExists
                  ? isEditMode
                    ? "Edit Clinic Profile"
                    : "Clinic Profile"
                  : "Setup Clinic Profile"}
              </h3>
              <p className="text-sm text-blue-700">
                {profileExists
                  ? isEditMode
                    ? "Make changes to your clinic information below."
                    : "View your clinic information. Click Edit to make changes."
                  : "Let's set up your clinic profile. Fill the details below to get started."}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {profileExists && !isEditMode && (
              <>
                <button
                  onClick={handleRefresh}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  disabled={loading}
                >
                  <RefreshCw
                    className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                  />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleEditClick}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </>
            )}

            {isEditMode && profileExists && (
              <button
                onClick={handleCancelEdit}
                className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {Object.keys(errors).length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700 font-medium">
            ⚠️ Please fill all required fields
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Clinic Information Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              1
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Clinic Information
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 ml-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="clinicName"
                value={profileData.clinicName}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.clinicName ? "border-red-300" : "border-gray-300"
                } ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                placeholder="Enter clinic name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={profileData.address}
                onChange={handleChange}
                disabled={!isEditMode}
                rows="3"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.address ? "border-red-300" : "border-gray-300"
                } ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                placeholder="Enter complete clinic address"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PAN Number
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={profileData.panNumber}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder="ABCDE1234F"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={profileData.registrationNumber}
                  onChange={handleChange}
                  disabled={!isEditMode}
                  className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  placeholder="Clinic Registration Number"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Doctor 1 Information Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              2
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Doctor 1 Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="doctor1Name"
                value={profileData.doctor1Name}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.doctor1Name ? "border-red-300" : "border-gray-300"
                } ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                placeholder="Dr. Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number
              </label>
              <input
                type="text"
                name="doctor1RegNumber"
                value={profileData.doctor1RegNumber}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="12345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualification
              </label>
              <input
                type="text"
                name="doctor1Qualification"
                value={profileData.doctor1Qualification}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="MBBS, MS (Ophthalmology)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="doctor1Mobile"
                value={profileData.doctor1Mobile}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="+91 9XXXXXXXXX"
              />
            </div>
          </div>
        </div>

        {/* Doctor 2 Information Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              3
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Doctor 2 Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Doctor Name
              </label>
              <input
                type="text"
                name="doctor2Name"
                value={profileData.doctor2Name}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="Dr. Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number
              </label>
              <input
                type="text"
                name="doctor2RegNumber"
                value={profileData.doctor2RegNumber}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="12345"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Qualification
              </label>
              <input
                type="text"
                name="doctor2Qualification"
                value={profileData.doctor2Qualification}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="MBBS, DNB"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                name="doctor2Mobile"
                value={profileData.doctor2Mobile}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="+91 9XXXXXXXXX"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              4
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? "border-red-300" : "border-gray-300"
                } ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""}`}
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="clinic@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={profileData.website}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="https://clinicwebsite.com"
              />
            </div>
          </div>
        </div>

        {/* Signature Labels Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              5
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Signature Labels (for PDFs)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Patient Representative Label
              </label>
              <input
                type="text"
                name="patientSignatureLabel"
                value={profileData.patientSignatureLabel}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="Patient / Representative"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Representative Label
              </label>
              <input
                type="text"
                name="doctorSignatureLabel"
                value={profileData.doctorSignatureLabel}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  !isEditMode ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                placeholder="Doctor Name"
              />
            </div>
          </div>
        </div>

        {/* Submit Button - Only visible in edit mode */}
        {isEditMode && (
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            {profileExists && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </button>
            )}

            <button
              type="submit"
              disabled={submitLoading}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>
                    {profileExists ? "Save Changes" : "Create Profile"}
                  </span>
                </>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default ClinicProfileSetup;
