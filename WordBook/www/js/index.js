document.addEventListener('deviceready', function(){
    
    //database connection created
    var myDB = window.sqlitePlugin.openDatabase({name: "wordbank.db", location: 'default'});
    //table created
    myDB.transaction(function(transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS words (word text primary key, pos text, meaning text, sentence text)', [],
        function(tx, result) {
            console.log("Table created successfully");
        },
        function(error) {
            console.log("Error occurred while creating the table.");
        });
    });

    $('#save_button').on('click', function() {
        console.log('save button clicked');
        
        var word = $('#word').val();
        var pos = $('#part_of_speech').val();
        var meaning = $('#meaning').val();
        var sentence = $('#usage').val();
        myDB.transaction(function(transaction) {
            var executeQuery = "INSERT INTO words (word, pos, meaning, sentence) VALUES (?,?,?,?)";
            transaction.executeSql(executeQuery, [word, pos, meaning, sentence] , function(tx, result) {
                console.log('Inserted');
            },
            function(error){
                console.log('Error occurred');
            });
        });   

    });

    $('#refresh_words').on('click', function() {
        console.log('refresh button clicked');
        
        myDB.transaction(function(transaction) {
            transaction.executeSql('SELECT * FROM words', [], function (tx, results) {
            var len = results.rows.length, i;
            $("#word_list").empty();
            for (i = 0; i < len; i++){
                $("#word_list").append('<li><a href="#word_popup" data-transition="slide" onclick="selected_word='+ i +'";>'+results.rows.item(i).word+'</a></li>');
            }
            $("#word_list").listview("refresh");
            }, null);
        });        

    });
});