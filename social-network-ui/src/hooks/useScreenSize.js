import { useEffect, useState } from 'react'
import { debounce } from 'lodash'

function useScreenSize() {
	const [screenSize, setScreenSize] = useState('')

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
