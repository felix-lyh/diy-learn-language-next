import React from 'react'

export default function BackBtn() {
    return (
        <div>
            <button className='flex items-center text-sm text-gray-500 hover:text-gray-700' onClick={() => window.history.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c-.806 0-1.531-.446-1.825-1.08a2.498 2.498 0 012.205-3.42m0 0a2.498 2.498 0 012.205 3.42c-.294.634-1.019 1.08-1.825 1.08M6.633 10.5L4.21 12.925m2.423-2.425c-.806 0-1.531-.446-1.825-1.08a2.498 2.498 0 012.205-3.42m0 0a2.498 2.498 0 012.205 3.42c-.294.634-1.019 1.08-1.825 1.08m0 0L7.21 12.925m2.423-2.425c-.806 0-1.531-.446-1.825-1.08a2.498 2.498 0 012.205-3.42m0 0a2.498 2.498 0 012.205 3.42c-.294.634-1.019 1.08-1.825 1.08m0 0L10.21 12.925" />
                </svg>
                Back
            </button>
        </div>
    )
}
