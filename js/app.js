/* Globale Variablen */
var parent = '#todo-liste';

/* Init */
$(function(){
    
    /* Fängt Touch-Ereignisse ab und gibt Sie an das Eingabefeld weiter */
    $('#add').on('touchstart', function(){
        $(this).find('input[name=add-task]').trigger('click');
    });
    
    /* Liste mit ToDos aus dem LocalStorage füllen */
	if(localStorage.length > 0) {
	    for(id in localStorage) {
	        $('#todo-liste').append('<li id="'+id+'">'+localStorage[id]+'</li>');
	    }
	}
	
	/* Checkboxen an die Liste anfügen */
	$('#todo-liste').find('li').prepend('<input type="checkbox">').wrapInner('<label></label>');
	

	/* Funktionen */
	var addTask = function(task, state, parent){
		var li = document.createElement('li');
		var checkbox = document.createElement('input');
			checkbox.setAttribute('type', 'checkbox');
		
		$(li)
		.append(task)
		.addClass(state)
		.appendTo(parent)
		.prepend(checkbox).wrapInner('<label></label>');
		
		var todo = new Object();
			todo.id = "todo-"+Date.now();
			todo.name = task;
			
		localStorage.setItem(todo.id, todo.name);
	};

	var changeTaskState = function(task, state){
		task.attr('class', state);
		if(state == 'done') {
		    localStorage.removeItem(task.attr('id'));
		    window.setTimeout(function(){
		        task.remove();
		    },1200);
		}
	};

	/* Events */
	$('#add').find('input[name=add-task]').on('focus', function(){
	    $('#todo-liste').on('touchstart', function(){
	        $('#add').find('input[name=add-task]').blur();
	        $('#add').submit();
	    });
	});

	$('#add').find('input[name=add-task]').on('blur', function(){
	    $('#todo-liste').off('touchstart');
        $('#add').submit();
	});
		
	$('#add').on('submit',function(){
		var task = $('#add').find('input[name=add-task]').val();
		var state = "todo";

		if(task != "") {
			addTask(task, state, parent);
		}
		
		/* Letzten Listenpunkt im Viewport sichtbar machen */
		document.querySelector('#todo-liste li:last-child').scrollIntoView();
		
		$('#add').find('input[name=add-task]').val('');
	
		return false;
	});
		
	$('#todo-liste').find(':checkbox').live('change', function(){
		var task = $(this).parent().parent();
		if($(this).is(':checked')) {
			var state = "done";
		} else {
			var state = "todo";
		}
		changeTaskState(task, state);
	});

});