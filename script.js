document.addEventListener("DOMContentLoaded", () => {
    const statusMessage = document.getElementById("status-message");
    const statusIcon = document.getElementById("status-icon");

    // دریافت وضعیت از سرور
    async function fetchStatus() {
        try {
            const response = await fetch("/status");
            const data = await response.json();

            if (data.status === "1") {
                statusMessage.textContent = "The parking lot is occupied";
                statusIcon.textContent = "🚗";
            } else if (data.status === "0") {
                statusMessage.textContent = "The parking lot is empty";
                statusIcon.textContent = "✅";
            } else {
                statusMessage.textContent = "Unknown status";
                statusIcon.textContent = "❓";
            }
        } catch (error) {
            console.error("Error fetching status:", error);
            statusMessage.textContent = "Error fetching status";
            statusIcon.textContent = "⚠️";
        }
    }

    // بلافاصله بعد از لود شدن صفحه وضعیت را دریافت کن
    fetchStatus();

    // وضعیت را هر 5 ثانیه به‌روزرسانی کن
    setInterval(fetchStatus, 5000);
});
