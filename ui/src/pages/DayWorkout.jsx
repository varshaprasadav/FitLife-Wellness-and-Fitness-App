// import React, { useEffect, useState } from "react";
// import { useParams, useSearchParams, useNavigate } from "react-router-dom";

// const DayWorkout = () => {
//   const { day } = useParams();
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const planId = searchParams.get("plan");
//   const dayNum = parseInt(day, 10);

//   const [workout, setWorkout] = useState([]);
//   const [completed, setCompleted] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [planTitle, setPlanTitle] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!planId) { navigate("/plans"); return; }

//         const resPlan = await fetch(`http://localhost:5000/admin/plans/id/${planId}`, {
//           credentials: "include"
//         });
//         if (!resPlan.ok) { navigate("/plans"); return; }
//         const planData = await resPlan.json();
//         setPlanTitle(planData.title);

//         const resUser = await fetch("http://localhost:5000/user/me", {
//           credentials: "include"
//         });
//         const user = await resUser.json();

//        let allowed = 1;

// if (user.subscriptionStart) {
//   const start = new Date(user.subscriptionStart);
//   const today = new Date();

//   start.setHours(0, 0, 0, 0);
//   today.setHours(0, 0, 0, 0);

//   const diffDays = Math.floor(
//     (today - start) / (1000 * 60 * 60 * 24)
//   );

//   allowed = diffDays + 1;
// }
//         if (dayNum > allowed) {
//           alert(`Day ${dayNum} is not unlocked yet! Come back tomorrow.`);
//           navigate(`/plans/${planId}`);
//           return;
//         }

//         const selectedDay = planData.days[dayNum - 1];
//         setWorkout(selectedDay?.exercises || []);

//         const resStatus = await fetch(
//           `http://localhost:5000/user/dayStatus?day=${dayNum}&plan=${planId}`,
//           { credentials: "include" }
//         );
//         const statusData = await resStatus.json();
//         setCompleted(statusData.completed || false);

//       } catch (err) {
//         console.error(err);
//         navigate("/plans");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [planId, dayNum, navigate]);

//   const markDayComplete = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/user/completeDay", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ day: dayNum, planId }),
//       });

//       const data = await res.json();
//       console.log("completeDay response:", data);

//       if (res.ok) {
//         setCompleted(true);
//         alert("Day completed! Come back tomorrow for the next day.");
//       } else {
//         alert("Failed: " + data.msg);
//       }
//     } catch (err) {
//       console.error("markDayComplete error:", err);
//       alert("Error completing day. Check console.");
//     }
//   };

//   if (loading) return <div className="text-white p-6 text-center">Loading workout...</div>;

//   return (
//     <div className="bg-gray-900 text-white p-8 min-h-screen">
//       <button
//         onClick={() => navigate(`/plans/${planId}`)}
//         className="mb-4 text-yellow-400 hover:underline"
//       >
//         Back to Plan Days
//       </button>

//       <h1 className="text-3xl font-bold text-center mb-1">Day {dayNum} Workout</h1>
//       {planTitle && <p className="text-center text-gray-300 mb-6">{planTitle}</p>}

//       {workout.length === 0 ? (
//         <p className="text-center text-gray-400">No exercises found for this day.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {workout.map((ex, i) => (
//             <div key={i} className="bg-gray-800 p-4 rounded-xl">
//               <h2 className="text-xl font-bold mb-1">{ex.name}</h2>
//               <p className="text-gray-300">Type: {ex.type}</p>
//               <p className="text-gray-300">Level: {ex.level}</p>
//               {ex.video && (
                
//                  <a href={ex.video}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-blue-400 mt-2 block hover:underline"
//                 >
//                   Watch Video
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="text-center mt-8">
//         {completed ? (
//           <div className="inline-block bg-green-600 px-8 py-3 rounded-full text-lg font-bold">
//             Day {dayNum} Completed!
//           </div>
//         ) : (
//           <button
//             onClick={markDayComplete}
//             className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-full text-lg font-bold transition-all"
//           >
//             Mark Day {dayNum} Complete
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DayWorkout;



import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const DayWorkout = () => {
  const { day } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const planId = searchParams.get("plan");
  const dayNum = parseInt(day, 10);

  const [workout, setWorkout] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [planTitle, setPlanTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!planId) { navigate("/plans"); return; }

        const resPlan = await fetch(`http://localhost:5000/admin/plans/id/${planId}`, {
          credentials: "include"
        });
        if (!resPlan.ok) { navigate("/plans"); return; }
        const planData = await resPlan.json();
        setPlanTitle(planData.title);

        const resUser = await fetch("http://localhost:5000/user/me", {
          credentials: "include"
        });
        const user = await resUser.json();

       let allowed = 1;

if (user.subscriptionStart) {
  const start = new Date(user.subscriptionStart);
  const today = new Date();

  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.floor(
    (today - start) / (1000 * 60 * 60 * 24)
  );

  allowed = diffDays + 1;
}
        if (dayNum > allowed) {
          alert(`Day ${dayNum} is not unlocked yet! Come back tomorrow.`);
          navigate(`/plans/${planId}`);
          return;
        }

        const selectedDay = planData.days[dayNum - 1];
        setWorkout(selectedDay?.exercises || []);

        const resStatus = await fetch(
          `http://localhost:5000/user/dayStatus?day=${dayNum}&plan=${planId}`,
          { credentials: "include" }
        );
        const statusData = await resStatus.json();
        setCompleted(statusData.completed || false);

      } catch (err) {
        console.error(err);
        navigate("/plans");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [planId, dayNum, navigate]);

  const markDayComplete = async () => {
    try {
      const res = await fetch("http://localhost:5000/user/completeDay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ day: dayNum, planId }),
      });

      const data = await res.json();
      console.log("completeDay response:", data);

      if (res.ok) {
        setCompleted(true);
        alert("Day completed! Come back tomorrow for the next day.");
      } else {
        alert("Failed: " + data.msg);
      }
    } catch (err) {
      console.error("markDayComplete error:", err);
      alert("Error completing day. Check console.");
    }
  };

  if (loading) return <div className="text-white p-6 text-center">Loading workout...</div>;

  return (
    <div className="bg-gray-900 text-white p-8 min-h-screen">
      <button
        onClick={() => navigate(`/plans/${planId}`)}
        className="mb-4 text-yellow-400 hover:underline"
      >
        Back to Plan Days
      </button>

      <h1 className="text-3xl font-bold text-center mb-1">Day {dayNum} Workout</h1>
      {planTitle && <p className="text-center text-gray-300 mb-6">{planTitle}</p>}

      {workout.length === 0 ? (
        <p className="text-center text-gray-400">No exercises found for this day.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {workout.map((ex, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-xl">
              <h2 className="text-xl font-bold mb-1">{ex.name}</h2>
              <p className="text-gray-300">Type: {ex.type}</p>
              <p className="text-gray-300">Level: {ex.level}</p>
              {ex.video && (
                
                 <a href={ex.video}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 mt-2 block hover:underline"
                >
                  Watch Video
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        {completed ? (
          <div className="inline-block bg-green-600 px-8 py-3 rounded-full text-lg font-bold">
            Day {dayNum} Completed!
          </div>
        ) : (
          <button
            onClick={markDayComplete}
            className="bg-yellow-500 hover:bg-yellow-600 px-8 py-3 rounded-full text-lg font-bold transition-all"
          >
            Mark Day {dayNum} Complete
          </button>
        )}
      </div>
    </div>
  );
};

export default DayWorkout;


