"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  isImportant?: boolean;
}

interface AnnouncementSliderProps {
  items: Announcement[];
}

export function AnnouncementSlider({ items }: AnnouncementSliderProps) {
  return (
    <div className="announcement-slider-container relative pb-12">
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper !pb-12"
      >
        {items.map((ann, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            <div 
              className={`h-full group relative overflow-hidden p-8 rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 flex flex-col ${
                ann.isImportant 
                  ? 'border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10 hover:border-amber-300 shadow-amber-500/5' 
                  : 'border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30 hover:border-slate-200 shadow-slate-500/5'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                   <div className={`h-2 w-2 rounded-full ${ann.isImportant ? 'bg-amber-500 animate-pulse' : 'bg-slate-300 dark:bg-slate-600'}`} />
                   <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">{ann.date}</span>
                </div>
                {ann.isImportant && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-bold uppercase tracking-wider">Kritik</span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors leading-tight">
                {ann.title}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                {ann.content}
              </p>
              
              <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Duyuru #{ann.id}</span>
                <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 shadow-sm border border-slate-100 dark:border-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </div>
              </div>

              {/* Decorative accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br transition-all duration-500 opacity-0 group-hover:opacity-10 blur-3xl -z-10 ${ann.isImportant ? 'from-amber-400 to-orange-500' : 'from-sky-400 to-indigo-500'}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .announcement-slider-container .swiper-button-next,
        .announcement-slider-container .swiper-button-prev {
          width: 44px;
          height: 44px;
          background: white;
          border-radius: 50%;
          color: #f59e0b;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .dark .announcement-slider-container .swiper-button-next,
        .dark .announcement-slider-container .swiper-button-prev {
          background: #0f172a;
          border-color: rgba(255,255,255,0.05);
        }
        .announcement-slider-container .swiper-button-next:after,
        .announcement-slider-container .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        .announcement-slider-container .swiper-pagination-bullet-active {
          background: #f59e0b;
        }
      `}</style>
    </div>
  );
}
