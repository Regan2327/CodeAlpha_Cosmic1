function calculateAge() {
  const dob = document.getElementById("dob").value;
  if (!dob) return alert("Please enter your birth date.");

  const birthDate = new Date(dob);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    days += 30;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  animateNumber(years, "years");
  animateNumber(months, "months");
  animateNumber(days, "days");

  document.getElementById("weekday").textContent = getWeekday(birthDate);
  document.getElementById("zodiac").textContent = getZodiacSign(birthDate.getDate(), birthDate.getMonth() + 1);

  const earthAge = years + months / 12;
  const planets = {
    mercury: (earthAge / 0.24).toFixed(1),
    venus: (earthAge / 0.62).toFixed(1),
    mars: (earthAge / 1.88).toFixed(1),
    jupiter: (earthAge / 11.86).toFixed(1)
  };

  for (let key in planets) {
    document.getElementById(key).textContent = planets[key];
  }

  document.getElementById("fact").textContent = getRandomFact(birthDate, years);
  const results = document.getElementById("results");
  results.classList.remove("hidden");
  results.classList.add("fade-in");
}

function animateNumber(target, id, duration = 1000) {
  const el = document.getElementById(id);
  const step = 20;
  const increment = target / (duration / step);
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      clearInterval(timer);
      current = target;
    }
    el.textContent = Math.floor(current);
  }, step);
}

function getWeekday(date) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
}

function getZodiacSign(day, month) {
  const signs = [
    "Capricorn", "Aquarius", "Pisces", "Aries", "Taurus", "Gemini",
    "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius"
  ];
  const lastDay = [19, 18, 20, 19, 20, 20, 22, 22, 22, 22, 21, 21];
  return day > lastDay[month - 1] ? signs[month] : signs[month - 1];
}

function getRandomFact(birthDate, age) {
  const leapYears = Math.floor(age / 4);
  const phases = ["New Moon", "First Quarter", "Full Moon", "Last Quarter"];
  const phase = phases[birthDate.getDate() % phases.length];
  const celebs = ["Einstein", "Oprah", "Mozart", "Taylor Swift"];
  const celeb = celebs[birthDate.getMonth() % celebs.length];

  const facts = [
    `You've lived through ${leapYears} leap years.`,
    `You were born on a ${phase} night.`,
    `You share your birth month with ${celeb}.`
  ];

  return facts[Math.floor(Math.random() * facts.length)];
}
