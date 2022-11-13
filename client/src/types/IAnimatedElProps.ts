export interface IAnimatedElProps {
   children?: React.ReactNode,
   className?: string
   whileInViewport?: boolean
   onClick?: (e?: any) => void
   delay?: number
   colorSchema?: 'black' | 'white'
}