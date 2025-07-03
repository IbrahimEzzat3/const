import React, { useState, useEffect, useCallback } from "react";
import { useLanguage } from "../../shared/context/LanguageContext";
import { Button } from "../ui";
import { FEATURE2_IMAGE } from "../../constants/images";
import { useAuth } from "../../shared/context/AuthContext";
import { sliderService } from "../../shared/services/sliderService";

const HeroSection = ({ slides, loadingSlides }) => {
  const { language } = useLanguage();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedSlides, setEditedSlides] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [saving, setSaving] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [newSlide, setNewSlide] = useState({ text: "", image: "" });
  const [adding, setAdding] = useState(false);

  // Define 2 static slides (not editable)
  const staticSlides = [
    {
      id: "static-1",
      image: FEATURE2_IMAGE,
      text:
        language === "ar"
          ? "الرمال ممكن أن تصبح جنة تستمتع بها"
          : "The sand can become a paradise to enjoy",
      isStatic: true,
    },

    {
      id: "static-2",
      image: FEATURE2_IMAGE,
      text:
        language === "ar"
          ? "نحول رؤيتك إلى واقع ملموس"
          : "We turn your vision into a tangible reality",
      isStatic: true,
    },
  ];

  // Sync editedSlides with slides prop
  useEffect(() => {
    setEditedSlides(slides || []);
  }, [slides]);

  // Combine static and backend slides for display
  const allSlides = loadingSlides
    ? staticSlides
    : [...staticSlides, ...editedSlides];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % allSlides.length);
  }, [allSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + allSlides.length) % allSlides.length);
  }, [allSlides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Admin edit logic
  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditMode(true);
  };

  const handleEditChange = (e, field) => {
    setEditedSlides((prev) =>
      prev.map((slide, idx) =>
        idx === editIndex ? { ...slide, [field]: e.target.value } : slide
      )
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedSlides((prev) =>
          prev.map((slide, idx) =>
            idx === editIndex ? { ...slide, image: reader.result } : slide
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      const slide = editedSlides[editIndex];
      await sliderService.updateSlider(slide._id, slide);
      setEditMode(false);
      setEditIndex(null);
    } catch (err) {
      // handle error (show notification, etc.)
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    // reset to prop slides
    setEditMode(false);
    setEditIndex(null);
    setEditedSlides(slides || []);
  };

  const handleAddSlide = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      await sliderService.createSlider({
        text: newSlide.text,
        image: newSlide.image,
        lang: language,
        order: editedSlides.length,
      });
      setAddMode(false);
      setNewSlide({ text: "", image: "" });
      // Optionally, you may want to trigger a refetch in HomePage after add
    } catch (err) {
      // handle error
      setAdding(false);
    }
    setAdding(false);
  };

  const handleNewSlideChange = (e) => {
    setNewSlide((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNewSlideImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSlide((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="w-screen mt-16">
      {/* Always show the slider, but only static slides while loading */}
      <>
        {isAdmin && !addMode && (
          <div className="flex justify-center mb-4">
            <Button variant="primary" onClick={() => setAddMode(true)}>
              + Add Slide
            </Button>
          </div>
        )}
        {isAdmin && addMode && (
          <form
            onSubmit={handleAddSlide}
            className="flex flex-col items-center gap-4 mb-4 bg-white p-4 rounded-lg shadow-lg max-w-xl mx-auto"
          >
            <input
              type="text"
              name="text"
              value={newSlide.text}
              onChange={handleNewSlideChange}
              placeholder="Slide text"
              className="text-black rounded-lg px-4 py-2 text-xl font-bold w-screen "
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleNewSlideImage}
              className="w-screen "
              required
            />
            {newSlide.image && (
              <img
                src={newSlide.image}
                alt="Preview"
                className="w-64 h-32 object-cover rounded-lg"
              />
            )}
            <div className="flex gap-2">
              <Button variant="primary" type="submit" disabled={adding}>
                {adding ? "Adding..." : "Add"}
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  setAddMode(false);
                  setNewSlide({ text: "", image: "" });
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}
        {/* Custom Slider */}
        <div
          className="relative h-[600px] overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
          style={{
            position: "relative",
            left: "50%",
            right: "50%",
            marginLeft: "-50vw",
            marginRight: "-50vw",
            width: "100vw",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Slides */}
          <div
            className="h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {allSlides.map((slide, index) => (
              <figure
                key={slide.id}
                className="absolute top-0 left-0 w-screen  h-full flex items-center justify-center text-white"
                style={{ transform: `translateX(${index * 100}%)` }}
              >
                <img
                  src={slide.image}
                  alt={slide.text}
                  className="absolute inset-0 w-screen  h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <figcaption className="relative z-10 text-center px-4">
                  {/* Only allow edit for backend slides, not static */}
                  {isAdmin &&
                  editMode &&
                  editIndex === index - staticSlides.length &&
                  !slide.isStatic ? (
                    <div className="flex flex-col items-center gap-4">
                      <input
                        type="text"
                        value={slide.text}
                        onChange={(e) => handleEditChange(e, "text")}
                        className="text-black rounded-lg px-4 py-2 text-xl font-bold mb-2 w-screen  max-w-lg"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-2"
                      />
                      <div className="flex gap-2">
                        <Button
                          variant="primary"
                          onClick={handleSaveEdit}
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Save"}
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="text-5xl md:text-6xl font-bold mb-8">
                        {slide.text}
                      </h1>
                      {/* Only allow edit button for backend slides, not static */}
                      {isAdmin && !editMode && !slide.isStatic && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEditClick(index - staticSlides.length)
                          }
                        >
                          Edit
                        </Button>
                      )}
                    </>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Button>
          <Button
            variant="ghost"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>

          {/* Pagination Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
            {allSlides.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => goToSlide(index)}
                className={`w-8 h-8 p-0 rounded-full transition-colors ${
                  currentSlide === index
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </>
    </section>
  );
};

export default HeroSection;
