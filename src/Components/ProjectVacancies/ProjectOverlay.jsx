import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { Pencil } from 'lucide-react';

const CreateProjectOverlay = ({ onClose }) => {
  const [form, setForm] = useState({
    title: '',
    creator: '',
    aim: '',
    description: '',
    skills: '', // comma-separated
    startDate: '',
    endDate: '',
    vacancies: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const newProject = {
        ...form,
        skills: form.skills.split(',').map((s) => s.trim()),
        uploadDate: serverTimestamp()
      };
      await addDoc(collection(db, 'projectVacancies'), newProject);
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#2AD2C9] rounded-[40px] shadow-2xl w-full max-w-6xl p-10">
        {/* Header */}
        <h2 className="text-3xl font-bold text-white mb-6">Create a New Project</h2>

        <div className="flex flex-wrap gap-6">
          {/* Left column */}
          <div className="flex-1 min-w-[300px]">
            {/* Project Title */}
            <div className="bg-[#F7F4E9] p-6 rounded-2xl mb-4 shadow">
              <label className="block font-bold text-lg mb-2 flex justify-between items-center">
                Project Title <Pencil size={18} />
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-black text-black text-lg outline-none"
              />
            </div>

            {/* Creator */}
            <div className="bg-[#F7F4E9] p-6 rounded-2xl mb-4 shadow">
              <label className="block font-bold text-lg mb-2 flex justify-between items-center">
                Creator Name <Pencil size={18} />
              </label>
              <input
                name="creator"
                value={form.creator}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-black text-black text-lg outline-none"
              />
            </div>

            {/* Skills */}
            <div className="bg-[#F7F4E9] p-6 rounded-2xl mb-4 shadow">
              <label className="block font-bold text-lg mb-2 flex justify-between items-center">
                Skills (comma-separated) <Pencil size={18} />
              </label>
              <input
                name="skills"
                value={form.skills}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-black text-black text-lg outline-none"
              />
            </div>

            {/* Dates */}
            <div className="flex gap-4">
              <div className="flex-1 bg-[#F7F4E9] p-6 rounded-2xl shadow">
                <label className="block font-bold text-lg mb-2">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-black text-black text-lg outline-none"
                />
              </div>
              <div className="flex-1 bg-[#F7F4E9] p-6 rounded-2xl shadow">
                <label className="block font-bold text-lg mb-2">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-black text-black text-lg outline-none"
                />
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-4">
            {/* Aim */}
            <div className="bg-[#F7F4E9] p-6 rounded-2xl shadow flex-1">
              <label className="block font-bold text-lg mb-2 flex justify-between items-center">
                Project Aim <Pencil size={18} />
              </label>
              <textarea
                name="aim"
                value={form.aim}
                onChange={handleChange}
                rows={4}
                className="w-full bg-transparent border-b-2 border-black text-black text-lg outline-none resize-none"
              />
            </div>

            {/* Description */}
            <div className="bg-[#F7F4E9] p-6 rounded-2xl shadow flex-1">
              <label className="block font-bold text-lg mb-2 flex justify-between items-center">
                Project Description <Pencil size={18} />
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={6}
                className="w-full bg-transparent border-b-2 border-black text-black text-lg outline-none resize-none"
              />
            </div>

            {/* Vacancies */}
            <div className="bg-[#F7F4E9] p-6 rounded-2xl shadow">
              <label className="block font-bold text-lg mb-2">Vacancies</label>
              <input
                type="number"
                name="vacancies"
                min={1}
                value={form.vacancies}
                onChange={handleChange}
                className="w-full bg-transparent border-b-2 border-black text-black text-lg outline-none"
              />
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end mt-8 gap-4">
          <button
            onClick={onClose}
            className="bg-gray-200 text-black font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#FF6B3D] text-white font-semibold px-6 py-3 rounded-xl shadow hover:bg-[#e35b2e] transition"
          >
            Publish Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectOverlay;
