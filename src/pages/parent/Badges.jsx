import { useEffect, useState, useRef } from "react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function Badges() {
  // ⭐ Get active student
  const student = useActiveStudent();

  // ⭐ Safe badges array
  const badges = student?.badges || [];

  // ⭐ Animation state
  const [animatedIds, setAnimatedIds] = useState([]);

  // ⭐ Track previously earned badges
  const prevEarnedRef = useRef([]);

  /* ===================================================
     🏅 SIMPLE DYNAMIC ANIMATION
     (No popup → avoids fast refresh issues)
  =================================================== */
  useEffect(() => {
    if (!badges.length) return;

    const earnedBadges = badges.filter((b) => b.earned);
    const earnedIds = earnedBadges.map((b) => b.id);

    // Animate only newly earned badges
    const newEarned = earnedBadges.filter(
      (b) => !prevEarnedRef.current.includes(b.id)
    );

    if (newEarned.length > 0) {
      setAnimatedIds(newEarned.map((b) => b.id));

      const timer = setTimeout(() => {
        setAnimatedIds([]);
      }, 1200);

      return () => clearTimeout(timer);
    }

    prevEarnedRef.current = earnedIds;
  }, [badges]);

  /* ===================================================
     ⭐ IF NO STUDENT SELECTED
  =================================================== */
  if (!student) {
    return (
      <div className="p-6 text-gray-500">
        No student selected
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-2">
        Achievements & Badges
      </h1>

      <p className="text-gray-600 mb-6">
        Celebrating your child’s efforts and positive habits
      </p>

      {/* ===================================================
          🏅 BADGE GRID
      =================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-4 rounded-lg text-center shadow transform transition-all duration-500 ${
              badge.earned
                ? "bg-green-50"
                : "bg-gray-100 opacity-60"
            } ${
              animatedIds.includes(badge.id)
                ? "scale-110 ring-2 ring-green-400"
                : "scale-100"
            }`}
          >
            <div className="text-4xl mb-2">
              {badge.icon}
            </div>

            <h2 className="font-semibold">
              {badge.title}
            </h2>

            <p className="text-sm text-gray-600 mt-1">
              {badge.description}
            </p>

            {badge.earned ? (
              <p className="mt-2 text-green-600 text-sm font-medium">
                ✔ Earned
              </p>
            ) : (
              <p className="mt-2 text-gray-500 text-sm">
                🔒 Locked
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ===================================================
          ❤️ ENCOURAGEMENT
      =================================================== */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg">
        <h2 className="font-semibold mb-1">
          ❤️ Encouragement for Parents
        </h2>
        <p className="text-sm">
          Celebrate effort and consistency. Small wins
          build confidence and long-term success.
        </p>
      </div>
    </div>
  );
}
