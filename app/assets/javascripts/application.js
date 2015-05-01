

// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require toastr.js
//= require jquery.serialize-object.min.js
//= require jquery.confirm.js
//= require_tree .

$(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

/**
 * Created by tinhtooaung on 30/04/15.
 */

function ready(){

    var addGroupForm = $('#add-group-form');
    addGroupForm.submit(function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
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
            addGroupForm[0].reset();
        });
        posting.error(function(data){
            errors.show();
            errors.append(data.responseText);
        });
        return false;
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
                    location.href = '/'
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
        e.stopImmediatePropagation();
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
            $('.group-edit-btn').data('name', groupName);
            editGroupForm[0].reset()
        }).error(function(data){
            errors.show();
            errors.append(data.responseText);
        });
        return false;
    });


    $('.btn-add-email-field').off('click').on('click',addNewEmailField);
    $('.btn-remove-email-field').off('click').on('click',deletePhoneField);
    function addNewEmailField(){
        var container = $('.email-fields');
        var index = container.children().length;
        var htmlContent = '<div class="form-group" id="email'+index+'">' +
            '<div class="col-sm-offset-2 col-sm-8">' +
            '<input type="text" name="contact[emails][]" class="form-control"' +
            'placeholder="Enter email address">' +
            '</div>' +
            '<div class="col-sm-2">' +
            '<div class="btn-group" role="group" aria-label="...">' +
            '<button class="btn btn-primary btn-add-email-field" type="button" id="btn-add-email-field'+index+'">' +
            '<i class="fa fa-plus-circle"></i>' +
            '</button>' +
            '<button class="btn btn-danger btn-remove-email-field" type="button" id="btn-remove-email-field'+index+'" ' +
            'data-id="email'+index+'">' +
            '<i class="fa fa-trash-o"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>';
        container.append(htmlContent);
        $('#btn-add-email-field' + index).click(addNewEmailField);
        $('#btn-remove-email-field' + index).click(deleteEmailField);
    }
    function deleteEmailField(){
        $('#' + $(this).data('id')).remove();
    }



    $('.btn-add-phone-field').off('click').on('click',addNewPhoneField);
    $('.btn-remove-phone-field').off('click').on('click',deletePhoneField);
    function addNewPhoneField(){
        var container = $('.phone-fields');
        var index = container.children().length;
        var htmlContent = '<div class="form-group" id="phone'+index+'">' +
            '<div class="col-sm-offset-2 col-sm-8">' +
            '<input type="text" name="contact[phones][]" class="form-control"' +
            'placeholder="Enter phone number">' +
            '</div>' +
            '<div class="col-sm-2">' +
            '<div class="btn-group" role="group" aria-label="...">' +
            '<button class="btn btn-primary btn-add-phone-field" type="button" id="btn-add-phone-field'+index+'">' +
            '<i class="fa fa-plus-circle"></i>' +
            '</button>' +
            '<button class="btn btn-danger btn-remove-phone-field" type="button" id="btn-remove-phone-field'+index+'" ' +
            'data-id="phone'+index+'">' +
            '<i class="fa fa-trash-o"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</div>';
        container.append(htmlContent);
        $('#btn-add-phone-field' + index).click(addNewPhoneField);
        $('#btn-remove-phone-field' + index).click(deletePhoneField);
    }
    function deletePhoneField(){
        $('#' + $(this).data('id')).remove();
    }

    $('.btn-delete-contact').confirm({
        text: "Really want to delete?",
        title: "Confirmation required",
        confirm: function(button) {
            var contactId = button.data('id');
            $.ajax({
                url: '/contacts/' + contactId,
                method: 'DELETE'
            }).success(function(){
                toastr.success('Contact is deleted');
                $(this).parent().parent().fadeOut(300, function() { $(this).remove(); });
                location.href = '/'
            }).error(function(data){
                toastr.error('Error deleting contact. Please try again later.');
            });
        },
        cancel: function(button) {},
        confirmButton: "Delete",
        cancelButton: "Cancel",
        post: false,
        confirmButtonClass: "btn-danger",
        cancelButtonClass: "btn-default",
        dialogClass: "modal-dialog modal-sm" // Bootstrap classes for large modal
    });
}

$(document).ready(ready);
$(document).on('page:load', ready);
