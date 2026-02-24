import { useEffect, useState, useRef, useMemo } from "react";
import useActiveStudent from "../../hooks/useActiveStudent";

export default function Badges() {
  const student = useActiveStudent();

  const badges = useMemo(() => {
    return student?.badges || [];
  }, [student]);

  const [animatedIds, setAnimatedIds] = useState([]);
  const prevEarnedRef = useRef([]);

  useEffect(() => {
    if (!badges.length) return;

    const earnedBadges = badges.filter((b) => b.earned);
    const earnedIds = earnedBadges.map((b) => b.id);

    const newEarned = earnedBadges.filter(
      (b) => !prevEarnedRef.current.includes(b.id)
    );

    prevEarnedRef.current = earnedIds;

    if (newEarned.length > 0) {
      setAnimatedIds(newEarned.map((b) => b.id));

      const timer = setTimeout(() => {
        setAnimatedIds([]);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [badges]);

  if (!student) {
    return <div className="p-6 text-gray-500">No student selected</div>;
  }

  return (
    <div className="max-w-5xl p-6">
      <h1 className="mb-2 text-2xl font-bold">Achievements & Badges</h1>

      <p className="mb-6 text-gray-600">
        Celebrating your child’s efforts and positive habits
      </p>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`transform rounded-lg p-4 text-center shadow transition-all duration-500 ${
              badge.earned
                ? "bg-green-50"
                : "bg-gray-100 opacity-60"
            } ${
              animatedIds.includes(badge.id)
                ? "scale-110 ring-2 ring-green-400"
                : "scale-100"
            }`}
          >
            <div className="mb-2 text-4xl">{badge.icon}</div>

            <h2 className="font-semibold">{badge.title}</h2>

            <p className="mt-1 text-sm text-gray-600">
              {badge.description}
            </p>

            {badge.earned ? (
              <p className="mt-2 text-sm font-medium text-green-600">
                ✔ Earned
              </p>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                🔒 Locked
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <h2 className="mb-1 font-semibold">
          ❤️ Encouragement for Parents
        </h2>
        <p className="text-sm">
          Celebrate effort and consistency. Small wins build
          confidence and long-term success.
        </p>
      </div>
    </div>
  );
}