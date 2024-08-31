import React from "react";
const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 pt-8">
      <div className="max-w-3xl max-h-full overflow-auto">
        <span className="absolute top-5 right-20 text-5xl text-gray-200 cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default ResumeModal;
