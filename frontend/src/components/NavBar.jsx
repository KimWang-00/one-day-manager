export default function NavBar({ title, showBack = true, rightContent, onBack }) {
  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.back()
    }
  }

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between h-11 px-4">
        <div className="w-10">
          {showBack && (
            <button 
              onClick={handleBack}
              className="w-8 h-8 flex items-center justify-center -ml-2 text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
        </div>
        <h1 className="text-base font-medium text-gray-900">{title}</h1>
        <div className="w-10 flex justify-end">
          {rightContent}
        </div>
      </div>
    </div>
  )
}
