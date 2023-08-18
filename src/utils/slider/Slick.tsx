import { useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import './dot.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  slidesToShow?: number;
  /** 반복 여부 */
  loop?: boolean;
}

function Slick({
  children,
  className,
  autoplay = false,
  slidesToShow,
  speed = 300,
  loop = true,
}: sliderProps) {
  interface ArrowProps {
    className?: string;
    style?: { [key: string]: string };
    onClick?: () => void;
  }

  function SampleNextArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      />
    );
  }
  const settings = useMemo<Settings>(
    () => ({
      dots: true,
      infinite: loop,
      speed: speed,
      slidesToShow: slidesToShow > 2 ? 3 : slidesToShow,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
      dotsClass: 'test-css',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: slidesToShow > 2 ? 3 : slidesToShow,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: slidesToShow > 2 ? 3 : slidesToShow,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    }),
    [autoplay, loop, speed]
  );
  return (
    <div className={'relative pb-10'}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}

export default Slick;
