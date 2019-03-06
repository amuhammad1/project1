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


});