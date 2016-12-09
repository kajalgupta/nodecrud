function getUsers(){
	$.get('http://localhost:8888/listUsers', function(data) {
		var size = Object.keys(data).length;
		if(size>0){
			$('.userList tbody').html('');
		}
		for (var i = 0; i < size; i++) {
			$('.userList tbody').append('<tr>' +
				'<td><a href="/view/?id=' + data[i]["id"] + '">' + (i+1) + '</a></td>' +
				'<td>' + data[i]["firstname"] + '</td>' +
				'<td>' + data[i]["lastname"] + '</td>' +
				'</tr>');
		}
	});
}

$('.register').click(function(e){
	e.preventDefault();
	if(checkNulls($('form').attr('id'))==0){
		$.ajax({
			url: 'http://localhost:8888/register',
			type: 'post',
			data: $('form').serialize(),
			success: function(data){
				if(data['error']){
					$('.alert').addClass('alert-danger');
					$('.alert').removeClass('alert-success');
					$('.alert').html('<strong>Oops!</strong> Something went wrong.');
				}else{
					$('.alert').addClass('alert-success');
					$('.alert').removeClass('alert-danger');
					$('.alert').html('<strong>Success!</strong> Profile added to database.');
				}
			},
			error: function(xhs,status, error){
				$('.alert').addClass('alert-danger');
				$('.alert').removeClass('alert-success');
				$('.alert').html('<strong>Oops!</strong> Something went wrong.\n' + error);
			}
		});
	}else{
		$('.alert').addClass('alert-danger');
		$('.alert').removeClass('alert-success');
		$('.alert').html('<strong>Error!</strong> All fields are required.');
	}
});

$('.update').click(function(e){
	e.preventDefault();
	if(checkNulls($('form').attr('id'))==0){
		$.ajax({
			url: 'http://localhost:8888/update/?id=' + $('input[name=id]').val(),
			type: 'PUT',
			data: $('form').serialize(),
			success: function(data){
				if(data['error']){
					$('.alert').addClass('alert-danger');
					$('.alert').removeClass('alert-success');
					$('.alert').html('<strong>Oops!</strong> Something went wrong.');
				}else{
					$('.alert').addClass('alert-success');
					$('.alert').removeClass('alert-danger');
					$('.alert').html('<strong>Success!</strong> Profile successfully updated.');
				}
			},
			error: function(xhs,status, error){
				$('.alert').addClass('alert-danger');
				$('.alert').removeClass('alert-success');
				$('.alert').html('<strong>Oops!</strong> Something went wrong.\n' + error);
			}
		});
	}else{
		$('.alert').addClass('alert-danger');
		$('.alert').removeClass('alert-success');
		$('.alert').html('<strong>Error!</strong> All fields are required.');
	}
});

$('.delete').click(function(e){
	e.preventDefault();
	bootbox.confirm({
		message: "Are you sure you want to delete " + $('input[name=firstname]').val() + "'s profile?",
		callback: function(result){
			if(result){
				$.ajax({
					url: 'http://localhost:8888/delete/?id=' + $('input[name=id]').val(),
					type: 'DELETE',
					data: $('form').serialize(),
					success: function(data){
						if(data=="success"){
							bootbox.alert({
								message: 'Profile successfully deleted!',
								callback: function(){
									window.location.href = '/';
								}
							});
						}else{
							$('.alert').addClass('alert-danger');
							$('.alert').removeClass('alert-success');
							$('.alert').html('<strong>Oops!</strong> Something went wrong.');
						}
					},
					error: function(xhs,status, error){
						$('.alert').addClass('alert-danger');
						$('.alert').removeClass('alert-success');
						$('.alert').html('<strong>Oops!</strong> Something went wrong.\n' + error);
					}
				});
			}
		}
	});
});

function checkNulls(form) {
	var forminput = $('#' + form + ' :input'),
		error = 0;
	$.each($(forminput), function( index, value ) {
	  if($(this).attr('name')!=undefined&&$(this).val()==""){
	  	error = 1;
	  }
	});
	return error;
}
