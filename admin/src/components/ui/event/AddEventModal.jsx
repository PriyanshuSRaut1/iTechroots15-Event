import React, { useState } from "react";
import { ref, push, set, get } from "firebase/database";
import { motion, AnimatePresence } from "framer-motion";
import database from "../../../firebase";
import { X, Plus, Trash2, Upload } from "lucide-react";

const AddEventModal = ({ show, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nextEventId, setNextEventId] = useState("Loading...");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [qrUploadProgress, setQrUploadProgress] = useState(0);
  const [isQrUploading, setIsQrUploading] = useState(false);
  const [qrImagePreview, setQrImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    imageUrl: "",
    qr: "",
    formLink: "",
    googleFormLink: "",
    eventType: "team", // New field: 'individual' or 'group'
    category: "Technical",
    price: { pool: "", first: "", second: "", third: "" },
    entryFees: "",
    paymentType: "team",
    minMembers: "",
    maxMembers: "",
    date: "",
    startTime: "",
    duration: "",
    location: "",
    requirements: [""],
    organizers: [{ name: "", email: "", phone: "" }],
    coOrganizers: [{ name: "", email: "", phone: "" }],
  });

  // Load the next available ID when modal opens
  React.useEffect(() => {
    if (show) {
      const fetchNextId = async () => {
        const eventsRef = ref(database, "events");
        const snapshot = await get(eventsRef);
        
        let nextId = 1;
        if (snapshot.exists()) {
          const events = snapshot.val();
          const ids = Object.keys(events).map(key => parseInt(events[key].id));
          if (ids.length > 0) {
            nextId = Math.max(...ids) + 1;
          }
        }
        setNextEventId(nextId.toString());
      };
      
      fetchNextId();
    }
  }, [show]);

  const validateFields = () => {
    const newErrors = {};
    let isValid = true;

    // Required fields validation
    if (!newEvent.title.trim()) {
      newErrors.title = "Event title is required";
      isValid = false;
    }
    if (!newEvent.description.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }
    if (!newEvent.imageUrl) {
      newErrors.imageUrl = "Event image is required";
      isValid = false;
    }
    if (!newEvent.formLink.trim()) {
      newErrors.formLink = "WhatsApp Group link is required";
      isValid = false;
    }
    if (!newEvent.googleFormLink.trim()) {
      newErrors.googleFormLink = "Google Form link is required";
      isValid = false;
    } else if (!newEvent.googleFormLink.startsWith("https://")) {
      newErrors.googleFormLink = "Must be a valid URL starting with https://";
      isValid = false;
    }
    if (!newEvent.entryFees.trim()) {
      newErrors.entryFees = "Entry fees information is required";
      isValid = false;
    } else if (isNaN(parseInt(newEvent.entryFees.replace(/\D/g, '')))) {
      newErrors.entryFees = "Entry fees must be a number";
      isValid = false;
    }
    if (newEvent.eventType === "team") {
      if (!newEvent.minMembers) {
        newErrors.minMembers = "Minimum members is required";
        isValid = false;
      } else if (isNaN(newEvent.minMembers) || parseInt(newEvent.minMembers) <= 0) {
        newErrors.minMembers = "Must be a positive number";
        isValid = false;
      }
      if (!newEvent.maxMembers) {
        newErrors.maxMembers = "Maximum members is required";
        isValid = false;
      } else if (isNaN(newEvent.maxMembers) || parseInt(newEvent.maxMembers) <= 0) {
        newErrors.maxMembers = "Must be a positive number";
        isValid = false;
      } else if (parseInt(newEvent.maxMembers) < parseInt(newEvent.minMembers)) {
        newErrors.maxMembers = "Must be greater than or equal to minimum members";
        isValid = false;
      }
    }
    if (!newEvent.date) {
      newErrors.date = "Event date is required";
      isValid = false;
    }
    if (!newEvent.startTime.trim()) {
      newErrors.startTime = "Start time is required";
      isValid = false;
    }
    if (!newEvent.duration.trim()) {
      newErrors.duration = "Duration is required";
      isValid = false;
    }
    if (!newEvent.location.trim()) {
      newErrors.location = "Location is required";
      isValid = false;
    }

    // Validate price fields are numbers if they exist
    if (newEvent.price.pool && isNaN(newEvent.price.pool)) {
      newErrors.pricePool = "Prize pool must be a number";
      isValid = false;
    }
    if (newEvent.price.first && isNaN(newEvent.price.first)) {
      newErrors.priceFirst = "First prize must be a number";
      isValid = false;
    }
    if (newEvent.price.second && isNaN(newEvent.price.second)) {
      newErrors.priceSecond = "Second prize must be a number";
      isValid = false;
    }
    if (newEvent.price.third && isNaN(newEvent.price.third)) {
      newErrors.priceThird = "Third prize must be a number";
      isValid = false;
    }

    // Validate requirements
    newEvent.requirements.forEach((req, index) => {
      if (!req.trim()) {
        newErrors[`requirement_${index}`] = "Requirement cannot be empty";
        isValid = false;
      }
    });

    // Validate organizers
    newEvent.organizers.forEach((org, index) => {
      if (!org.name.trim()) {
        newErrors[`organizer_name_${index}`] = "Organizer name is required";
        isValid = false;
      }
      if (!org.email.trim()) {
        newErrors[`organizer_email_${index}`] = "Organizer email is required";
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(org.email)) {
        newErrors[`organizer_email_${index}`] = "Invalid email format";
        isValid = false;
      }
      if (!org.phone.trim()) {
        newErrors[`organizer_phone_${index}`] = "Organizer phone is required";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrors({ ...errors, imageUrl: "Only JPG, JPEG, or PNG images are allowed" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, imageUrl: "Image size must be less than 5MB" });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setErrors({ ...errors, imageUrl: "" });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'itechroots');
      formData.append('cloud_name', 'dtns6egbl');

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      const response = await fetch(`https://api.cloudinary.com/v1_1/dtns6egbl/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setNewEvent({ ...newEvent, imageUrl: data.secure_url });
    } catch (error) {
      console.error('Upload error:', error);
      setErrors({ ...errors, imageUrl: 'Image upload failed. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleQrFileUpload = async (file) => {
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrors({ ...errors, qr: "Only JPG, JPEG, or PNG images are allowed" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors({ ...errors, qr: "Image size must be less than 5MB" });
      return;
    }

    setIsQrUploading(true);
    setQrUploadProgress(0);
    setErrors({ ...errors, qr: "" });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'itechroots');
      formData.append('cloud_name', 'dtns6egbl');

      const previewUrl = URL.createObjectURL(file);
      setQrImagePreview(previewUrl);

      const response = await fetch(`https://api.cloudinary.com/v1_1/dtns6egbl/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('QR Upload failed');

      const data = await response.json();
      setNewEvent({ ...newEvent, qr: data.secure_url });
    } catch (error) {
      console.error('QR Upload error:', error);
      setErrors({ ...errors, qr: 'QR image upload failed. Please try again.' });
    } finally {
      setIsQrUploading(false);
    }
  };

  const handleChange = (field, value) => {
    setNewEvent({ ...newEvent, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const handleNestedChange = (parent, field, value) => {
    setNewEvent({
      ...newEvent,
      [parent]: { ...newEvent[parent], [field]: value },
    });
    if (errors[`${parent}${field.charAt(0).toUpperCase() + field.slice(1)}`]) {
      const newErrors = { ...errors };
      delete newErrors[`${parent}${field.charAt(0).toUpperCase() + field.slice(1)}`];
      setErrors(newErrors);
    }
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    const updatedArray = [...newEvent[arrayName]];
    updatedArray[index][field] = value;
    setNewEvent({ ...newEvent, [arrayName]: updatedArray });
    
    const errorKey = `${arrayName}_${field}_${index}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const addArrayItem = (arrayName, emptyItem) => {
    setNewEvent({ ...newEvent, [arrayName]: [...newEvent[arrayName], emptyItem] });
  };

  const removeArrayItem = (arrayName, index) => {
    const updatedArray = newEvent[arrayName].filter((_, i) => i !== index);
    setNewEvent({ ...newEvent, [arrayName]: updatedArray });
    
    const newErrors = { ...errors };
    Object.keys(newErrors).forEach(key => {
      if (key.startsWith(`${arrayName}_`) && key.endsWith(`_${index}`)) {
        delete newErrors[key];
      }
    });
    setErrors(newErrors);
  };

  const handleRequirementChange = (index, value) => {
    const updatedReqs = [...newEvent.requirements];
    updatedReqs[index] = value;
    setNewEvent({ ...newEvent, requirements: updatedReqs });
    
    if (errors[`requirement_${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`requirement_${index}`];
      setErrors(newErrors);
    }
  };

  const handleNumericInput = (field, value) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');
    handleChange(field, numericValue);
  };

  const addNewEventToDB = async () => {
    if (!validateFields()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const eventsRef = ref(database, "events");
      const newEventRef = push(eventsRef);
      
      const eventWithId = { 
        ...newEvent,
        id: nextEventId,
        minMembers: newEvent.eventType === "team" ? parseInt(newEvent.minMembers) : 1,
        maxMembers: newEvent.eventType === "team" ? parseInt(newEvent.maxMembers) : 1,
        entryFees: parseInt(newEvent.entryFees.replace(/\D/g, '')),
        price: {
          pool: newEvent.price.pool ? parseInt(newEvent.price.pool) : "",
          first: newEvent.price.first ? parseInt(newEvent.price.first) : "",
          second: newEvent.price.second ? parseInt(newEvent.price.second) : "",
          third: newEvent.price.third ? parseInt(newEvent.price.third) : ""
        }
      };
      
      await set(newEventRef, eventWithId);
      
      const likesRef = ref(database, `likes/${nextEventId}/count`);
      await set(likesRef, 0);
      
      onClose();
      setNewEvent({
        title: "",
        description: "",
        imageUrl: "",
        qr: "",
        formLink: "",
        googleFormLink: "",
        eventType: "team",
        category: "Technical",
        price: { pool: "", first: "", second: "", third: "" },
        entryFees: "",
        paymentType: "team",
        minMembers: "",
        maxMembers: "",
        date: "",
        startTime: "",
        duration: "",
        location: "",
        requirements: [""],
        organizers: [{ name: "", email: "", phone: "" }],
        coOrganizers: [{ name: "", email: "", phone: "" }],
      });
      setImagePreview(null);
      setQrImagePreview(null);
      setErrors({});
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 px-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 space-y-6 mt-10 mb-10"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">Add New Event</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Event ID</label>
                <input 
                  className="border p-2 rounded bg-gray-100" 
                  value={nextEventId} 
                  readOnly 
                  disabled
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Event Title*</label>
                <input 
                  className={`border p-2 rounded ${errors.title ? 'border-red-500' : ''}`} 
                  placeholder="Event Title (e.g. Hackathon)" 
                  value={newEvent.title} 
                  onChange={(e) => handleChange("title", e.target.value)} 
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              {/* Event Type */}
              <div className="flex flex-col col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1">Event Type*</label>
                <div className="flex gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="eventType"
                      value="individual"
                      checked={newEvent.eventType === "individual"}
                      onChange={() => handleChange("eventType", "individual")}
                    />
                    <span>Individual</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      className="form-radio"
                      name="eventType"
                      value="team"
                      checked={newEvent.eventType === "team"}
                      onChange={() => handleChange("eventType", "team")}
                    />
                    <span>Group</span>
                  </label>
                </div>
              </div>

              {/* Group fields - only show if event type is group */}
              {newEvent.eventType === "team" && (
                <>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Minimum Members*</label>
                    <input
                      type="number"
                      min="1"
                      className={`border p-2 rounded ${errors.minMembers ? 'border-red-500' : ''}`}
                      placeholder="Min members (e.g. 2)"
                      value={newEvent.minMembers}
                      onChange={(e) => handleChange("minMembers", e.target.value)}
                    />
                    {errors.minMembers && <p className="text-red-500 text-xs mt-1">{errors.minMembers}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-700 mb-1">Maximum Members*</label>
                    <input
                      type="number"
                      min="1"
                      className={`border p-2 rounded ${errors.maxMembers ? 'border-red-500' : ''}`}
                      placeholder="Max members (e.g. 5)"
                      value={newEvent.maxMembers}
                      onChange={(e) => handleChange("maxMembers", e.target.value)}
                    />
                    {errors.maxMembers && <p className="text-red-500 text-xs mt-1">{errors.maxMembers}</p>}
                  </div>
                </>
              )}

              {/* Event Image Upload Section */}
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1">Event Image*</label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={(e) => handleFileUpload(e.target.files[0])}
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}
                {errors.imageUrl && (
                  <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>
                )}
                {newEvent.imageUrl && !isUploading && !errors.imageUrl && (
                  <p className="text-xs text-green-600 mt-1">Image uploaded successfully!</p>
                )}
              </div>

              {/* QR Code Upload Section */}
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1">QR Code Image (Optional)</label>
                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Upload QR Code</span>
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
                    </div>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={(e) => handleQrFileUpload(e.target.files[0])}
                    />
                  </label>
                  {qrImagePreview && (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
                      <img 
                        src={qrImagePreview} 
                        alt="QR Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
                {isQrUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${qrUploadProgress}%` }}
                    ></div>
                  </div>
                )}
                {errors.qr && (
                  <p className="text-red-500 text-xs mt-1">{errors.qr}</p>
                )}
                {newEvent.qr && !isQrUploading && !errors.qr && (
                  <p className="text-xs text-green-600 mt-1">QR code uploaded successfully!</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">WhatsApp Group Link*</label>
                <input 
                  className={`border p-2 rounded ${errors.formLink ? 'border-red-500' : ''}`} 
                  placeholder="WhatsApp Group Link" 
                  value={newEvent.formLink} 
                  onChange={(e) => handleChange("formLink", e.target.value)} 
                />
                {errors.formLink && <p className="text-red-500 text-xs mt-1">{errors.formLink}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Google Form Link*</label>
                <input 
                  className={`border p-2 rounded ${errors.googleFormLink ? 'border-red-500' : ''}`} 
                  placeholder="Google Form Link" 
                  value={newEvent.googleFormLink} 
                  onChange={(e) => handleChange("googleFormLink", e.target.value)} 
                />
                {errors.googleFormLink && <p className="text-red-500 text-xs mt-1">{errors.googleFormLink}</p>}
              </div>

              {/* Category Dropdown */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="border p-2 rounded" value={newEvent.category} onChange={(e) => handleChange("category", e.target.value)}>
                  <option value="Technical">Technical</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Sports">Sports</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Entry Fees (₹)*</label>
                <input 
                  type="text"
                  className={`border p-2 rounded ${errors.entryFees ? 'border-red-500' : ''}`} 
                  placeholder="Entry Fees (e.g. 100)" 
                  value={newEvent.entryFees} 
                  onChange={(e) => handleNumericInput("entryFees", e.target.value)} 
                />
                {errors.entryFees && <p className="text-red-500 text-xs mt-1">{errors.entryFees}</p>}
              </div>

              {/* Payment Type Selector */}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Payment Calculation*</label>
                <select 
                  className="border p-2 rounded"
                  value={newEvent.paymentType}
                  onChange={(e) => handleChange("paymentType", e.target.value)}
                >
                  <option value="team">Per Group</option>
                  <option value="individual">Per Head</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Event Date*</label>
                <input 
                  type="date" 
                  className={`border p-2 rounded ${errors.date ? 'border-red-500' : ''}`} 
                  value={newEvent.date} 
                  onChange={(e) => handleChange("date", e.target.value)} 
                />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Start Time*</label>
                <input 
                  className={`border p-2 rounded ${errors.startTime ? 'border-red-500' : ''}`} 
                  placeholder="Start Time (e.g. 2:00 PM IST)" 
                  value={newEvent.startTime} 
                  onChange={(e) => handleChange("startTime", e.target.value)} 
                />
                {errors.startTime && <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Duration*</label>
                <input 
                  className={`border p-2 rounded ${errors.duration ? 'border-red-500' : ''}`} 
                  placeholder="Duration (e.g. 5 hrs)" 
                  value={newEvent.duration} 
                  onChange={(e) => handleChange("duration", e.target.value)} 
                />
                {errors.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
              </div>

              <div className="flex flex-col col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-1">Location*</label>
                <input 
                  className={`border p-2 rounded ${errors.location ? 'border-red-500' : ''}`} 
                  placeholder="Location (e.g. IT Echo Labs, Conference Room B)" 
                  value={newEvent.location} 
                  onChange={(e) => handleChange("location", e.target.value)} 
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea 
                className={`border p-2 rounded w-full ${errors.description ? 'border-red-500' : ''}`} 
                rows="3" 
                placeholder="Short Description" 
                value={newEvent.description} 
                onChange={(e) => handleChange("description", e.target.value)} 
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            {/* Price Section */}
            <div>
              <h4 className="font-semibold mb-2">Prize Details (₹)</h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col">
                  <input 
                    type="number"
                    min="0"
                    className={`border p-2 rounded ${errors.pricePool ? 'border-red-500' : ''}`} 
                    placeholder="Total Prize Pool" 
                    value={newEvent.price.pool} 
                    onChange={(e) => handleNestedChange("price", "pool", e.target.value)} 
                  />
                  {errors.pricePool && <p className="text-red-500 text-xs mt-1">{errors.pricePool}</p>}
                </div>
                <div className="flex flex-col">
                  <input 
                    type="number"
                    min="0"
                    className={`border p-2 rounded ${errors.priceFirst ? 'border-red-500' : ''}`} 
                    placeholder="First Prize" 
                    value={newEvent.price.first} 
                    onChange={(e) => handleNestedChange("price", "first", e.target.value)} 
                  />
                  {errors.priceFirst && <p className="text-red-500 text-xs mt-1">{errors.priceFirst}</p>}
                </div>
                <div className="flex flex-col">
                  <input 
                    type="number"
                    min="0"
                    className={`border p-2 rounded ${errors.priceSecond ? 'border-red-500' : ''}`} 
                    placeholder="Second Prize" 
                    value={newEvent.price.second} 
                    onChange={(e) => handleNestedChange("price", "second", e.target.value)} 
                  />
                  {errors.priceSecond && <p className="text-red-500 text-xs mt-1">{errors.priceSecond}</p>}
                </div>
                <div className="flex flex-col">
                  <input 
                    type="number"
                    min="0"
                    className={`border p-2 rounded ${errors.priceThird ? 'border-red-500' : ''}`} 
                    placeholder="Third Prize" 
                    value={newEvent.price.third} 
                    onChange={(e) => handleNestedChange("price", "third", e.target.value)} 
                  />
                  {errors.priceThird && <p className="text-red-500 text-xs mt-1">{errors.priceThird}</p>}
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="font-semibold mb-2">Requirements*</h4>
              {newEvent.requirements.map((req, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <div className="flex-1">
                    <input 
                      className={`border p-2 rounded w-full ${errors[`requirement_${i}`] ? 'border-red-500' : ''}`} 
                      value={req} 
                      onChange={(e) => handleRequirementChange(i, e.target.value)} 
                      placeholder="Requirement (e.g. Laptop with VS Code installed)" 
                    />
                    {errors[`requirement_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`requirement_${i}`]}</p>}
                  </div>
                  {newEvent.requirements.length > 1 && (
                    <button onClick={() => removeArrayItem("requirements", i)} className="text-red-500"><Trash2 size={20} /></button>
                  )}
                </div>
              ))}
              <button onClick={() => addArrayItem("requirements", "")} className="flex items-center text-blue-500"><Plus size={18} /> Add Requirement</button>
            </div>

            {/* Organizers */}
            <div>
              <h4 className="font-semibold mb-2">Organizers*</h4>
              {newEvent.organizers.map((org, i) => (
                <div key={i} className="mb-4">
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="flex flex-col">
                      <input 
                        className={`border p-2 rounded ${errors[`organizer_name_${i}`] ? 'border-red-500' : ''}`} 
                        placeholder="Name" 
                        value={org.name} 
                        onChange={(e) => handleArrayChange("organizers", i, "name", e.target.value)} 
                      />
                      {errors[`organizer_name_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`organizer_name_${i}`]}</p>}
                    </div>
                    <div className="flex flex-col">
                      <input 
                        className={`border p-2 rounded ${errors[`organizer_email_${i}`] ? 'border-red-500' : ''}`} 
                        placeholder="Email" 
                        value={org.email} 
                        onChange={(e) => handleArrayChange("organizers", i, "email", e.target.value)} 
                      />
                      {errors[`organizer_email_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`organizer_email_${i}`]}</p>}
                    </div>
                    <div className="flex flex-col">
                      <input 
                        className={`border p-2 rounded ${errors[`organizer_phone_${i}`] ? 'border-red-500' : ''}`} 
                        placeholder="Phone" 
                        value={org.phone} 
                        onChange={(e) => handleArrayChange("organizers", i, "phone", e.target.value)} 
                      />
                      {errors[`organizer_phone_${i}`] && <p className="text-red-500 text-xs mt-1">{errors[`organizer_phone_${i}`]}</p>}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {newEvent.organizers.length > 1 && (
                      <button onClick={() => removeArrayItem("organizers", i)} className="text-red-500"><Trash2 size={20} /></button>
                    )}
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem("organizers", { name: "", email: "", phone: "" })} className="flex items-center text-blue-500"><Plus size={18} /> Add Organizer</button>
            </div>

            {/* Co-Organizers */}
            <div>
              <h4 className="font-semibold mb-2">Co-Organizers</h4>
              {newEvent.coOrganizers.map((co, i) => (
                <div key={i} className="mb-4">
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    <div className="flex flex-col">
                      <input 
                        className="border p-2 rounded" 
                        placeholder="Name" 
                        value={co.name} 
                        onChange={(e) => handleArrayChange("coOrganizers", i, "name", e.target.value)} 
                      />
                    </div>
                    <div className="flex flex-col">
                      <input 
                        className="border p-2 rounded" 
                        placeholder="Email" 
                        value={co.email} 
                        onChange={(e) => handleArrayChange("coOrganizers", i, "email", e.target.value)} 
                      />
                    </div>
                    <div className="flex flex-col">
                      <input 
                        className="border p-2 rounded" 
                        placeholder="Phone" 
                        value={co.phone} 
                        onChange={(e) => handleArrayChange("coOrganizers", i, "phone", e.target.value)} 
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    {newEvent.coOrganizers.length > 1 && (
                      <button onClick={() => removeArrayItem("coOrganizers", i)} className="text-red-500"><Trash2 size={20} /></button>
                    )}
                  </div>
                </div>
              ))}
              <button onClick={() => addArrayItem("coOrganizers", { name: "", email: "", phone: "" })} className="flex items-center text-blue-500"><Plus size={18} /> Add Co-Organizer</button>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
              <button 
                onClick={addNewEventToDB} 
                disabled={isSubmitting || isUploading || isQrUploading} 
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-blue-400"
              >
                {isSubmitting ? "Adding..." : "Add Event"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddEventModal;