/**
 * Created by tinhtooaung on 1/05/15.
 */


function ready() {

    $('.btn-add-email-field').click(addNewEmailField);
    $('.btn-remove-email-field').click(deletePhoneField);
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



    $('.btn-add-phone-field').click(addNewPhoneField);
    $('.btn-remove-phone-field').click(deletePhoneField);
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
