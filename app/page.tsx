'use client'

import { createClient } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) return <div className="text-center py-8">Loading...</div>

  if (!user) {
    window.location.href = '/'
    return null
  }

  // TODO: Fetch real role from Supabase profiles table (we'll add later)
  const role: 'teacher' | 'admin' | 'student' | 'parent' = 'teacher' // Change to 'admin' for testing if needed

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-primary mb-2">Welcome, {user.email}!</h2>
        <p className="text-gray-600">Role: <span className="font-medium capitalize">{role}</span></p>
      </div>
      
      {role === 'teacher' && (
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold text-primary mb-4">Your Assigned Classes</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 hover:shadow-md">
              <h4 className="font-medium">JSS1 - Mathematics</h4>
              <p className="text-sm text-gray-600">Enter scores</p>
            </div>
            <div className="border rounded-lg p-4 hover:shadow-md">
              <h4 className="font-medium">JSS2 - English</h4>
              <p className="text-sm text-gray-600">Enter scores</p>
            </div>
          </div>
        </div>
      )}

      {role === 'admin' && (
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold text-primary mb-4">Pending Reviews</h3>
          <p className="text-gray-600">5 classes awaiting approval</p>
        </div>
      )}

      {role === 'student' && (
        <div className="bg-white rounded-lg p-6 shadow">
          <h3 className="text-xl font-semibold text-primary mb-4">Your Results</h3>
          <p className="text-gray-600">First Term 2025/2026 - 85% Average</p>
        </div>
      )}
    </div>
  )
}
