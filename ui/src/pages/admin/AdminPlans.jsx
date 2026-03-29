import React, { useEffect, useState } from "react";
import AdminAddPlan from "./AdminAddPlan";

const AdminPlans = () => {
  const [plans, setPlans] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/admin/plans", {
        credentials: "include", 
      });

      if (res.status === 401 || res.status === 403) {
        setError("Unauthorized. Please log in as admin.");
        setPlans([]);
        setLoading(false);
        return;
      }

      const data = await res.json();

      setPlans(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch plans.");
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      const res = await fetch(`http://localhost:5000/admin/plans/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setRefresh(!refresh);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete plan");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while deleting plan");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Plans</h1>

      <AdminAddPlan onSuccess={() => setRefresh(!refresh)} />

      {loading && <p>Loading plans...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 justify-items-center">
          {plans.length === 0 && <p>No plans found. Please add plans.</p>}

          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`${plan.bg || "bg-gray-800"} rounded-xl overflow-hidden hover:scale-105 transition-all w-80`}
            >
              <img
                src={plan.image || "/placeholder.jpg"}
                alt={plan.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-3">
                <h2 className="text-lg font-semibold">{plan.title}</h2>
                <p className="text-2xl font-bold mt-1">₹ {plan.price}</p>
                <p className="text-sm">{plan.days?.length || 0} Days Access</p>

                <button
                  onClick={() => alert(`View plan: ${plan.title}`)}
                  className={`w-full bg-white ${plan.buttonColor || "text-black"} font-bold text-lg h-9 mt-2 rounded-full`}
                >
                  {plan.buttonText}
                </button>

                <button
                  onClick={() => handleDelete(plan._id)}
                  className="w-full bg-red-600 mt-2 font-bold text-lg h-9 rounded-full hover:bg-red-700"
                >
                  Delete Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPlans;