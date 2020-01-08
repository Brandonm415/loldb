function sendUpdateEntry() {
    $.ajax({
        //find: ('#updatePlayer' + id),
        //console.log(find)
        url: '/update/',
        type: 'PUT',
        //make sure id matches form
        data: $('#updatePlayer').serialize(),
        success: function (result) {
            window.location.reload(true);
        }
    })
};

