import FuzzyText from '@/components/(guest)/ui/fuzzy-text'

export default function GuestNotFound() {
  return (
    <FuzzyText baseIntensity={0.2} hoverIntensity={0.1} enableHover>
      404
    </FuzzyText>
  )
}
