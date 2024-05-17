import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

const persistOptions = {
  name: "my-store",
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    courseState: state.courseState,
    facultyState: state.facultyState,
    activeGroup: state.activeGroup,
  }),
};

export const useStore = create(
  persist(
    devtools((set) => ({
      courseState: 1,
      facultyState: "фвт",
      activeGroup: null, 
      currentFraction: "numerator",
      currentDay: "monday",
      dataByGroup: [],
      loadingNav: true,
      loadingSchedule: true,

      setCourseState: (course) =>
        set((state) => ({
          ...state,
          courseState: course,
        })),

      setFacultyState: (faculty) =>
        set((state) => ({
          ...state,
          facultyState: faculty,
        })),

      setCurrentFraction: (fraction) =>
        set((state) => ({
          ...state,
          currentFraction: fraction,
        })),

      setCurrentDay: (day) =>
        set((state) => ({
          ...state,
          currentDay: day,
        })),

      setLoadingNav: () =>
        set((state) => ({
          ...state,
          loadingNav: false,
        })),

      setLoadingSchedule: () =>
        set((state) => ({
          ...state,
          loadingSchedule: false,
        })),

      setDataByGroup: (data) =>
        set((state) => ({
          ...state,
          dataByGroup: data,
        })),

      setActiveGroup: (group) =>
        set((state) => ({
          ...state,
          activeGroup: group || null, 
        })),
    })),
    persistOptions
  )
);

useStore.subscribe((state) => {
  persistOptions.partialize = (state) => ({
    courseState: state.courseState,
    facultyState: state.facultyState,
    activeGroup: state.activeGroup,
  });
});
