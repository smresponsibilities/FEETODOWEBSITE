const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

            const currentDate = new Date();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();

            function generateCalendar(month, year) {
                const firstDay = new Date(year, month, 1);
                const lastDay = new Date(year, month + 1, 0);
                const daysInMonth = lastDay.getDate();

                document.getElementById('month').innerText = monthNames[month];
                document.getElementById('year').innerText = year;

                let html = '';

                for (let i = 0; i < firstDay.getDay(); i++) {
                    html += '<div class="day"></div>';
                }

                for (let day = 1; day <= daysInMonth; day++) {
                    html += `<div class="day">${day}</div>`;
                }

                document.getElementById('calendar-body').innerHTML = html;
            }

            function nextMonth() {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                generateCalendar(currentMonth, currentYear);
            }

            function previousMonth() {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                generateCalendar(currentMonth, currentYear);
            }

            generateCalendar(currentMonth, currentYear);

            document.getElementById('calendar-link').addEventListener('click', function() {
                var calendarContainer = document.getElementById('calendar-container');
                if (calendarContainer.style.display === 'none') {
                    calendarContainer.style.display = 'block';
                } else {
                    calendarContainer.style.display = 'none';
                }
            });