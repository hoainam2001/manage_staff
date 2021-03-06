const upload = document.querySelector(".fileN"),
clickBtn = document.querySelector("#files"),
delFileBtn = document.querySelector("#delFile"),
uploadFile = document.querySelector("#nopTask")

if(upload && clickBtn){
    upload.addEventListener("click", () =>{
        clickBtn.click();
    })
}

// get value for submit process
function get_values_submit(maTask, tenTask, listFile){
    $('#name_submit').html(tenTask)
    $('#task_submit').val(maTask)
    $('#listFiles').val(listFile)
}

function get_values_unsubmit(maTask, tenTask){
    $('#name_unsubmit').html(tenTask)
    $('#task_unsubmit').val(maTask)
}


// get value for delete preprocessing
function get_values_file(nameFile, maTask, id, position){
    // console.log(nameFile, maTask, id, position)
    $(document).ready(function(){
        $('#nameFile').html(nameFile);
    });
    $('#delFile').attr('data-id', id)
    $('#delFile').attr('data-ma_task', maTask)
    $('#delFile').attr('data-position', position)
}

if(delFileBtn){
    delFileBtn.addEventListener("click", e =>{
        const btn = e.target;
        const id = btn.dataset.id;
        const maTask = btn.dataset.ma_task;
        const position = btn.dataset.position;
        delete_file(maTask, id, position);
    })
}

// for delete file before submit
function delete_file(maTask, id, position){
    var http = new XMLHttpRequest();
    var url = '../api/deleteFile.php';
    var params = `maTask=${maTask}&id=${id}&position=${position}`;
    http.open('POST', url, true);
    
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    http.onreadystatechange = function() {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            window.location.reload()
        }
    }
    http.send(params);
}

function show(e) {
    let nameClass = e.classList.value
    const showDesc = $(`.row-desc-${nameClass}`)
    const removeDesc = $(`.row-desc-${nameClass}.active`)

    if(showDesc){
        showDesc.addClass('active')
    }
    if(removeDesc){
        removeDesc.removeClass('active')
    }
}

// manage Room
function get_values_room(name_room, destination_room, id){
    // console.log(name_room, destination_room)
    $('#name-room-edit').val(name_room)
    $('#destination-room-edit').val(destination_room)
    $('#id-room-edit').val(id)
}

$('#nopTask').submit(()=>{
    window.location.reload()
});

$('#addRoom').submit(()=>{
    setTimeout(()=>{
        window.location.reload()
    }, 3000)
});

// list Staff page
function get_values_staff_reset(id, fname, lname, username){
    // console.log(id, fname, lname)
    $('#name_staff_reset').html(fname + " " + lname)
    $('#id-reset').val(id)
    $('#username-reset').val(username)
}

function get_values_edit_task(id, name){
    $('#name_task_edit').val(name)
    $('#id_task_edit').val(id)
    get_desc_task(id)
}

function get_values_del_task(id, name){
    $('#name_task_del').html(name)
    $('#id_task_del').val(id)
}

function get_desc_task(id){
    var http = new XMLHttpRequest();
    var url = '../api/get_desc_task.php';
    var params = `id=${id}`;
    http.open('POST', url, true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function(e) {//Call a function when the state changes.
        if(http.readyState == 4 && http.status == 200) {
            let data = e.target.response
            data = JSON.parse(data)
            data = data.data
            console.log(data)
            $('#desc_task_edit').html(data)
        }
    }
    http.send(params);
}

function get_values_evaluate_report(name, id, username, songay){
    console.log(name, id, username, songay)
    $('#num_report_evaluate').val(songay)
    $('#username_report_evaluate').val(username)
    $('#name_staff_report').html(name)
    $('#id_report_evaluate').val(id)
}

function get_name_to_huy_bo_nhiem(id, name){
    console.log(id);
    let id_reject_manager = $('#id_reject_manager');
    let nameToShow = $('#name-to-huy');
    id_reject_manager.val(id);
    nameToShow.html(name);
}

function get_name_to_bo_nhiem(id, name){
    let id_choose_manager = $('#id_choose_manager');
    let nameToShow = $('#name-to-chon');
    id_choose_manager.val(id);
    console.log(id)
    nameToShow.html(name);
}
