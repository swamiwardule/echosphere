import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'
import { formatImageUrl } from '../api/apiService'

function BannerSlider({ banners }) {
  if (!banners || banners.length === 0) {
    return null
  }

  return (
    <motion.div
      className='banner-slider-container'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Navigation, Pagination]}
        className='banner-swiper'
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id} className='banner-slide'>
            <div className='banner-slide-content'>
              <motion.img
                src={formatImageUrl(item.image)}
                alt={item.title || 'Banner'}
                className='banner-image'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {item.title && (
                <div className='banner-title-overlay'>
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {item.title}
                  </motion.h2>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  )
}

export default BannerSlider