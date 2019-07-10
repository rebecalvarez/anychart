//Displaying anychart data on the chart
    anychart.data.loadJsonFile("./data.php", function (data) {  // init and draw chart
        var chart = anychart.bar(data);
        chart.title("Volunteering Hours");
        chart.container("container");
        chart.draw();
        //Making sure the data is correct
        console.log(data);



        // update chart from server every 5 seconds
        setInterval(function(){
            // make request to server
            // to use loadJsonFile function you must include data-adapter.min.js to your page
            anychart.data.loadJsonFile("./data.php", function (data) {
                chart.data(data);
            })
        }, 5000);
    });

    // Calendar Code

    //The event CRUD operations are requested via AJAX using this 
    //library callbacks. The existing events are fetched from the 
    //database and returned in a JSON format to render them on the calendar.

//The Calendar has bugs and it's not connecting properly with the database
//If I had more time I would troubleshoot the AJAX calls.

    $(document).ready(function () {
        var calendar = $('#calendar').fullCalendar({
            editable: true,
            events: "fetch-event.php",
            displayEventTime: false,
            eventRender: function (event, element, view) {
                if (event.allDay === 'true') {
                    event.allDay = true;
                } else {
                    event.allDay = false;
                }
            },
            selectable: true,
            selectHelper: true,
            select: function (start, end, allDay) {
                var title = prompt('Event Title:');
    
                if (title) {
                    var start = $.fullCalendar.formatDate(start, "Y-MM-DD HH:mm:ss");
                    var end = $.fullCalendar.formatDate(end, "Y-MM-DD HH:mm:ss");
    
                    $.ajax({
                        url: 'add-event.php',
                        data: 'title=' + title + '&start_date_time=' + start + '&end_date_time=' + end,
                        type: "POST",
                        success: function (data) {
                            displayMessage("Added Successfully");
                        }
                    });
                    calendar.fullCalendar('renderEvent',
                            {
                                title: title,
                                start: start,
                                end: end,
                                allDay: allDay
                            },
                            
                    true
                            );
                }
                calendar.fullCalendar('unselect');
            },
            
            editable: true,
            eventDrop: function (event, delta) {
                        var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
                        var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
                        $.ajax({
                            url: 'edit-event.php',
                            data: 'title=' + event.title + '&start_date_time=' + start + '&end_date_time=' + end + '&id=' + event.id,
                            type: "POST",
                            success: function (response) {
                                displayMessage("Updated Successfully");
                            }
                        });
                    },
            eventClick: function (event) {
                var deleteMsg = confirm("Do you really want to delete?");
                if (deleteMsg) {
                    $.ajax({
                        type: "POST",
                        url: "delete-event.php",
                        data: "&id=" + event.id,
                        success: function (response) {
                            if(parseInt(response) > 0) {
                                $('#calendar').fullCalendar('removeEvents', event.id);
                                displayMessage("Deleted Successfully");
                            }
                        }
                    });
                }
            }
    
        });
    });
    
    function displayMessage(message) {
            $(".response").html("<div class='success'>"+message+"</div>");
        setInterval(function() { $(".success").fadeOut(); }, 1000);
    }