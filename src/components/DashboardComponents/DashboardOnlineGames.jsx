import React from 'react'
import { useNavigate } from 'react-router-dom'

const DashboardOnlineGames = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Online Tools for Skill Development</h2>
          <p className="text-sm text-gray-500 mt-1">Choose an online game below to play it with your class.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate('/user/online-games/rhyming-words')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">🎵</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Rhyming Words Adventure</h3>
          <p className="text-sm text-gray-500">Choose the word that rhymes with the teacher's word.</p>
        </button>

        <button
          onClick={() => navigate('/user/online-games/fill-in-the-blanks')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">🔤</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Fill in the Blanks</h3>
          <p className="text-sm text-gray-500">Pick the missing letter to complete each alphabet question.</p>
        </button>

        {/* <button
          onClick={() => navigate('/user/online-games/numeracy-skills')}
          className="text-left bg-white rounded-3xl shadow hover:shadow-lg transition p-6 border border-gray-200"
        >
          <div className="text-4xl mb-4">🔢</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Numeracy Skills</h3>
          <p className="text-sm text-gray-500">Build cognitive skills with number and counting activities.</p>
        </button> */}
      </div>
    </div>
  )
}

export default DashboardOnlineGames
