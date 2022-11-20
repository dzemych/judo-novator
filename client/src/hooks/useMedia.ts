import {useEffect, useState} from "react";

const useMedia = () => {
   const extSmall = 425
   const small = 768
   const normal = 950
   const medium = 1150
   const big = 1250

   const [vw, setVw] = useState(0)
   const handleResize = () => setVw(window.innerWidth)

   const [isBigLaptop, setIsBigLaptop] = useState(false)
   const [isNormalLaptop, setIsNormalLaptop] = useState(false)
   const [isSmallLaptop, setIsSmallLaptop] = useState(false)
   const [isTablet, setIsTablet] = useState(false)
   const [isPhone, setIsPhone] = useState(false)
   const [isBigPhone, setIsBigPhone] = useState(false)

   useEffect(() => {
      if (typeof window === 'undefined') return

      const vw = window.innerWidth

      // Set true
      if (vw <= extSmall) setIsPhone(true)

      if (vw >= extSmall && vw < small) setIsBigPhone(true)

      if (vw >= small && vw < normal) setIsTablet(true)

      if (vw >= normal) setIsSmallLaptop(true)

      if (vw >= medium) setIsNormalLaptop(true)

      if (vw >= big) setIsBigLaptop(true)

      // Set false
      if (vw > extSmall) setIsPhone(false)

      if (vw < normal) setIsSmallLaptop(false)

      if (vw < small) setIsTablet(false)

      if (vw < extSmall) setIsBigPhone(false)

      if (vw < medium) setIsNormalLaptop(false)
      
      if (vw <  big) setIsBigLaptop(false)

      // * Handle window resize
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)

      }, [vw])

   return { isPhone, isSmallLaptop, isTablet, isBigPhone, isNormalLaptop, isBigLaptop, vw }
}

export default useMedia