import React from 'react'

const ProgressRing = ({ progress }) => {

  const normalizedRadius = 50 - 1 * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <svg className="rotate"
      height={120}
      width={120}
    >
      <circle
        stroke="#be7052"
        fill="transparent"
        strokeWidth={4}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={60}
        cy={60}
      />
    </svg>
  );
}

export default ProgressRing;


// const StyledLeftSpan =  styled.span`
//   clip: rect(0px, 50px, 100px, 0px);
//   animation: ${css`${keyframes`
//   ${props => `0% { transform: rotate(${props.deg}deg); }`}
//   50% { transform: rotate(180deg); }
//   100% { transform: rotate(180deg); }
//   `} ${props => props.duration}s infinite linear`};
// `

// const StyledRightSpan = styled.span`
// clip: rect(0, 100px, 100px, 50px);
// animation: ${css`${keyframes`
// 0% { transform: rotate(${props => props.deg}deg); }
// 50% { transform: rotate(0deg); }
// 100% { transform: rotate(180deg); }
// `} ${props => `${props.duration}s`} infinite linear`};
// `

// const RadialAnimation = ({ timePeriod, timePercentage, duration }) => {
//   const animationClass = (direction) => `circle ${timePeriod} ${direction} rotate`;

//   const timeDegrees = (tp) => tp * 360 / 100 < 180 ?
//     { leftDeg: Math.round(tp * 360 / 100), rightDeg: 0 } :
//     { leftDeg: 180, rightDeg: Math.round(tp * 360 / 100) - 180 };

//   const { leftDeg, rightDeg } = timeDegrees(timePercentage);
//   console.log(leftDeg, rightDeg)

//   return (
//     <div class="radial">
//       <div className={animationClass('left')}><StyledLeftSpan duration={duration} deg={leftDeg} /></div>
//       <div className={animationClass('right')}><StyledRightSpan duration={duration} deg={rightDeg} /></div>
//     </div >
//   );
// };

// export default RadialAnimation;