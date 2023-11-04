import { useState, useEffect } from 'react'
import { debounce } from 'lodash'

function useScreenSize() {
	const [screenSize, setScreenSize] = useState(getInitialScreenSize())

	function getInitialScreenSize() {
		const width = window.innerWidth
		if (width < 768) {
			return 'mobile'
		} else if (width >= 768 && width < 1024) {
			return 'tablet'
		} else {
			return 'desktop'
		}
	}

	useEffect(() => {
		const handleResize = debounce(() => {
			const width = window.innerWidth
			if (width < 768) {
				setScreenSize('mobile')
			} else if (width >= 768 && width < 1024) {
				setScreenSize('tablet')
			} else {
				setScreenSize('desktop')
			}
		}, 300)

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return screenSize
}

export default useScreenSize
