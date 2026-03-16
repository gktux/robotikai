"use client";

import { useState } from 'react';
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
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  const closeModal = () => setSelectedAnnouncement(null);

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
              className={`h-full group relative overflow-hidden p-8 rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 flex flex-col cursor-pointer ${
                ann.isImportant 
                  ? 'border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10 hover:border-amber-300 shadow-amber-500/5' 
                  : 'border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30 hover:border-slate-200 shadow-slate-500/5'
              }`}
              onClick={() => setSelectedAnnouncement(ann)}
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
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors leading-tight line-clamp-2">
                {ann.title}
              </h3>
              
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow line-clamp-4">
                {ann.content}
              </p>
              
              <div className="mt-auto pt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest group-hover:underline">Devamını Oku →</span>
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">#{ann.id}</span>
              </div>

              {/* Decorative accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br transition-all duration-500 opacity-0 group-hover:opacity-10 blur-3xl -z-10 ${ann.isImportant ? 'from-amber-400 to-orange-500' : 'from-sky-400 to-indigo-500'}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Announcement Modal */}
      {selectedAnnouncement && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in duration-300"
          onClick={closeModal}
        >
          <div 
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[3rem] bg-white p-8 md:p-12 shadow-2xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800 relative scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md -mt-4 -mx-4 px-4 py-4 mb-8 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
              <div className="flex items-center gap-3">
                 <div className={`h-3 w-3 rounded-full ${selectedAnnouncement.isImportant ? 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]' : 'bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.5)]'}`} />
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{selectedAnnouncement.date}</span>
              </div>
              <button 
                onClick={closeModal}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-500 transition-all hover:rotate-90"
              >
                ✕
              </button>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 mb-8 leading-tight tracking-tight">
              {selectedAnnouncement.title}
            </h2>

            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                {selectedAnnouncement.content || "Bu duyuru için henüz detaylı bir içerik girilmemiş."}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-slate-300 uppercase">ROBOTIKAI DUYURU MERKEZİ</span>
               </div>
               <span className="text-[10px] font-black text-slate-300 uppercase">KAYIT ID: #{selectedAnnouncement.id}</span>
            </div>
            
            {/* Close Button at bottom for mobile */}
            <button 
              onClick={closeModal}
              className="mt-8 w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm dark:bg-white dark:text-slate-900 hover:scale-[0.98] transition-transform shadow-xl md:hidden"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
