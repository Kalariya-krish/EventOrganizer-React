Good. That simplifies everything.

If it’s **only frontend implementation**, then stop thinking about two stacks. Forget MERN vs ASP.NET for now.

You need:

👉 **One clean, well-structured frontend project.**
That’s it.

No backend.
No real authentication.
No real database.

But it must LOOK and BEHAVE like a real system.

---

# First — What Your Evaluators Expect

Since it’s frontend-only, they expect:

* Proper folder structure
* Clean routing
* Role-based UI logic (simulated)
* State management
* Good component structure
* Professional flow

They do NOT expect:

* Real API
* Real DB
* JWT implementation

So don’t overcomplicate.

---

# What You Should Build

You are building a **React frontend prototype with logic simulation**.

Now let’s structure it properly.

---

# 1️⃣ Folder Structure (Final Decision)

Keep it clean and scalable.

```
src/
│
├── assets/
│
├── components/
│   ├── common/
│   │   ├── Header
│   │   ├── Footer
│   │   ├── Button
│   │   └── Modal
│   │
│   ├── event/
│   │   ├── EventCard
│   │   ├── EventList
│   │   └── EventForm
│   │
│   └── review/
│       └── FeedbackForm
│
├── layouts/
│   ├── PublicLayout
│   ├── UserLayout
│   └── AdminLayout
│
├── pages/
│   ├── public/
│   ├── user/
│   └── admin/
│
├── routes/
│   └── AppRoutes
│
├── context/
│   └── AuthContext
│
└── App
```

That is professional-level structure.

---

# 2️⃣ How To Handle “Authentication” Without Backend

You simulate login.

When user logs in:

Store fake user data in state:

```
{
  name: "John",
  role: "user"
}
```

or

```
role: "admin"
```

Use this to control routing and UI.

That’s enough for frontend-only.

---

# 3️⃣ How To Protect Routes (Frontend-Only Version)

When user tries:

```
/admin/dashboard
```

Check:

* Is user logged in?
* Is role === admin?

If not:
→ Redirect to login
OR
→ Show “Unauthorized”

This is simulated protection.

That’s correct for frontend-only.

---

# 4️⃣ How To Simulate Event Data

Since no backend:

Create a file:

```
data/events.js
```

Store array of events.

When user registers:

* Update local state
* Add event to MyEvents list

No API calls needed.

---

# 5️⃣ What You MUST Show In Frontend Demo

These interactions must work:

✔ Login → Redirect based on role
✔ Register Event → Changes button to “Registered”
✔ Event appears in My Events
✔ Feedback form opens
✔ Submit feedback → Show success message
✔ Admin can add event (updates list)

If these work smoothly → strong frontend.

---

# 6️⃣ What NOT To Do

❌ Don’t fake API calls with unnecessary complexity
❌ Don’t over-engineer Redux if not needed
❌ Don’t create 50 useless components
❌ Don’t mix admin and user routes

Keep it clean.

---

# 7️⃣ Developer Mindset Shift

Since this is frontend-only, your focus is:

* UI state management
* Routing
* Component reusability
* Layout structure
* User experience flow

Not database logic.

---

# Now Let Me Challenge You

How will you simulate:

“User registers event → Button changes → Event added to My Events → Seats decrease”

Explain your logic without backend.

I want to see if you’re thinking like a frontend developer or still backend-focused.
