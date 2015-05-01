/**
 * Created by tinhtooaung on 30/04/15.
 */

$(document).ready(function(){

    var addGroupForm = $('#add-group-form');
    addGroupForm.submit(function(e){
        e.preventDefault();
        var postData = $(this).serializeObject();
        var posting = $.post('/groups', postData);
        var errors = $('#add-group-form-errors');
        errors.hide();
        errors.empty();
        posting.success(function(data){
            var groupContainer = $('.groups');
            groupContainer.fadeIn(300, function() { $(this).append(data.html); });
            setupGroupDeleteBtn($('#group-delete-btn' + data.group.id));
            groupContainer.on('click', '#group-edit-btn' + data.group.id, editGroup);
            $('#add-group-modal').modal('hide');
            toastr.success(postData.group.name + ' is added');
            addGroupForm[0].reset()
        });
        posting.error(function(data){
            errors.show();
            errors.append(data.responseText);
        });
    });


    function setupGroupDeleteBtn(deleteGroupBtn){
        deleteGroupBtn.confirm({
            text: "Really want to delete? <br> All of the contacts under the group will be move to Default 'All' Group.",
            title: "Confirmation required",
            confirm: function(button) {
                var groupId = button.data('id');
                var groupName = button.data('name');
                $.ajax({
                    url: '/groups/' + groupId,
                    method: 'DELETE'
                }).success(function(){
                    toastr.success(groupName + ' is deleted');
                    deleteGroupBtn.closest('li').fadeOut(300, function() { $(this).remove(); });
                }).error(function(data){
                    toastr.error('Error deleting ' + groupName + '. Please try again later.');
                });
            },
            cancel: function(button) {},
            confirmButton: "Delete",
            cancelButton: "Cancel",
            post: false,
            confirmButtonClass: "btn-danger",
            cancelButtonClass: "btn-default",
            dialogClass: "modal-dialog" // Bootstrap classes for large modal
        });
    }
    setupGroupDeleteBtn($('.group-delete-btn'));


    var editGroup = function(){
        $('#edit-group-modal').modal('show');
        var editGroupBtn = $(this);
        var groupId = editGroupBtn.data('id');
        var groupName = editGroupBtn.data('name');
        var editNameInput = $('#edit-group-input-name');
        editNameInput.val(groupName);
        editNameInput.attr('data-id', groupId);
    };
    $('.group-edit-btn').click(editGroup);

    var editGroupForm = $('#edit-group-form');
    editGroupForm.submit(function(e){
        e.preventDefault();
        var errors = $('#edit-group-form-errors');
        errors.hide();
        errors.empty();

        var postData = $(this).serializeObject();
        var editNameInput = $('#edit-group-input-name');
        var groupId = editNameInput.data('id');
        var groupName = postData.group.name;
        $.ajax({
            url: '/groups/' + groupId,
            method: 'PUT',
            data: postData
        }).success(function(){
            toastr.success(groupName + ' is edited');
            $('#group-name' + editNameInput.data('id')).text(groupName);
            $('#edit-group-modal').modal('hide');
            editGroupForm[0].reset()

        }).error(function(data){
            errors.show();
            errors.append(data.responseText);
        });
    });
});