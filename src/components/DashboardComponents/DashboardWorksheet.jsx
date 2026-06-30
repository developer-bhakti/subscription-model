import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardWorksheet = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Worksheets & Activities</h2>
          <p className="text-sm text-gray-500 mt-1">Choose a worksheet collection below to open the content.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/user/worksheet/month-wise')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Month-wise Worksheets</h3>
          <p className="text-sm text-gray-500">Open month-wise worksheets and activities for the school year.</p>
        </button>

        <button
          onClick={() => navigate('/user/worksheet/summer-worksheets')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">☀️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Summer Worksheets</h3>
          <p className="text-sm text-gray-500">Open summer worksheet packs for Nursery, LKG and UKG.</p>
        </button>

         <button
          onClick={() => navigate('/user/rhyming/words')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Rhyming Words Adventure</h3>
          <p className="text-sm text-gray-500">Choose the word that rhymes with the teacher's word.</p>
        </button>
      </div>
    </div>
  )
}

export default DashboardWorksheet