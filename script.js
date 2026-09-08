/**
 * Vishal Khatri - Personal Portfolio Scripts
 * Thoughtful micro-interactions: Live IST clock, clipboard feedback, and console greeting.
 */

// 1. Live Indian Standard Time (IST) Clock
function updateLiveTime() {
  const timeElem = document.getElementById('liveTime');
  if (!timeElem) return;

  try {
    const now = new Date();
    // Format to Asia/Kolkata timezone
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    timeElem.textContent = `${timeString} IST`;
  } catch (err) {
    timeElem.textContent = 'Jaipur, India (IST)';
  }
}

setInterval(updateLiveTime, 1000);
updateLiveTime();

// 2. One-click Copy Email with visual feedback
function copyEmail() {
  const email = 'vishalkhatri2047@gmail.com';
  const tooltip = document.getElementById('copyTooltip');
  const btn = document.getElementById('copyEmailBtn');

  navigator.clipboard.writeText(email).then(() => {
    if (tooltip) {
      tooltip.textContent = 'Copied! ✓';
      tooltip.style.color = '#34d399';
      btn.style.borderColor = '#10b981';
      
      setTimeout(() => {
        tooltip.textContent = 'Click to copy';
        tooltip.style.color = '';
        btn.style.borderColor = '';
      }, 2500);
    }
  }).catch(() => {
    // Fallback if clipboard API is restricted
    window.location.href = `mailto:${email}`;
  });
}

// 3. Developer Console Easter Egg
console.log(
  "%c👋 Welcome to Vishal Khatri's Portfolio!%c\nLooking to connect or collaborate? Shoot an email to vishalkhatri2047@gmail.com or find me on GitHub: https://github.com/vishalk2047",
  "color: #3b82f6; font-size: 14px; font-weight: bold;",
  "color: #a1a1aa; font-size: 12px;"
);
