$(document).ready(function() {
    // Variabel untuk menyimpan jumlah bentuk
    let shapeCount = 0;
    // Batas maksimum bentuk per baris
    let maxShapesPerRow = 16;
    // Spasi antar bentuk
    let shapeMargin = 10; // Spasi antar shape
    // Status animasi, digunakan untuk menghindari penambahan bentuk selama animasi berlangsung
    let isAnimating = false;

    // Fungsi untuk mendapatkan warna acak dalam format hexadecimal
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Fungsi untuk menambahkan bentuk baru ke dalam container
    function addShape() {
        // Memeriksa apakah sedang terjadi animasi, jika iya, fungsi dihentikan
        if (isAnimating) return;
        // Mengatur status animasi menjadi true
        isAnimating = true;

        // Mendapatkan nilai dari elemen-elemen input
        const shapeType = $('#shapeType').val();
        const shapeColor = $('#shapeColor').val();
        const shapeSize = parseInt($('#shapeSize').val());
        const halfSize = shapeSize / 2;
        let $shape;

        // Menentukan jenis bentuk yang akan ditambahkan berdasarkan pilihan pengguna
        switch(shapeType) {
            case 'square':
                // Jika bentuknya kotak
                $shape = $('<div class="shape"></div>');
                $shape.css('border-radius', '8px');
                break;
            case 'circle':
                // Jika bentuknya lingkaran
                $shape = $('<div class="shape"></div>');
                $shape.css('border-radius', '50%');
                break;
            case 'triangle':
                // Jika bentuknya segitiga
                $shape = $('<div class="shape triangle"></div>');
                $shape.css({
                    'border-left-width': `${halfSize}px`,
                    'border-right-width': `${halfSize}px`,
                    'border-bottom-width': `${shapeSize}px`,
                    'border-bottom-color': shapeColor,
                });
                break;
            case 'diamond':
                // Jika bentuknya berlian
                $shape = $('<div class="shape diamond"></div>');
                $shape.css({
                    'border-left-width': `${halfSize}px`,
                    'border-right-width': `${halfSize}px`,
                    'border-bottom-width': `${halfSize}px`,
                    'border-bottom-color': shapeColor,
                });
                $shape.append(`<div style="width: 0; height: 0; border-left: ${halfSize}px solid transparent; border-right: ${halfSize}px solid transparent; border-top: ${halfSize}px solid ${shapeColor}; position: absolute; top: ${halfSize}px; left: -${halfSize}px;"></div>`);
                break;
            default:
                // Jika tidak ada jenis bentuk yang dipilih, bentuknya tetap default
                $shape = $('<div class="shape"></div>');
        }

        // Menyesuaikan CSS bentuk sesuai dengan jenis bentuknya
        if (shapeType !== 'triangle' && shapeType !== 'heart' && shapeType !== 'diamond' && shapeType !== 'star') {
            $shape.css({
                'background-color': shapeColor,
                'width': `${shapeSize}px`,
                'height': `${shapeSize}px`,
            });
        }

        // Menentukan posisi bentuk yang akan ditambahkan
        $shape.css({
            'position': 'absolute',
            'top': `${Math.floor(shapeCount / maxShapesPerRow) * (shapeSize + shapeMargin)}px`,
            'left': `-${shapeSize + shapeMargin}px` // Dimulai di luar layar
        });

        // Menambahkan bentuk ke dalam container
        $('.shapeContainer').append($shape);

        // Animasi untuk membawa bentuk ke dalam tampilan
        $shape.animate({ left: `${(shapeCount % maxShapesPerRow) * (shapeSize + shapeMargin)}px` }, 700, function() {
            // Animasi selesai, mengatur status animasi menjadi false
            isAnimating = false;
            // Menambah jumlah bentuk
            shapeCount++;

            // Mengatur warna acak baru untuk input color
            const newColor = getRandomColor();
            $('#shapeColor').val(newColor);
        });
    }

    // Fungsi untuk menghapus bentuk terakhir dari container
    function removeShape() {
        // Memeriksa apakah sedang terjadi animasi atau jumlah bentuk sudah nol, jika iya, fungsi dihentikan
        if (isAnimating || shapeCount === 0) return;
        // Mengatur status animasi menjadi true
        isAnimating = true;

        // Memilih semua bentuk dalam container
        const $shapes = $('.shape');
        // Memilih bentuk terakhir dari container
        const $lastShape = $shapes.last();

        // Menghilangkan bentuk terakhir dengan efek fade-out
        $lastShape.fadeOut(700, function() {
            // Menghapus bentuk dari DOM setelah efek fade-out selesai
            $lastShape.remove();
            // Mengatur status animasi menjadi false
            isAnimating = false;
            // Mengurangi jumlah bentuk
            shapeCount--;
        });
    }

    // Menambahkan event listener untuk tombol "Tambah Bentuk"
    $('#addShape').on('click', addShape);
    // Menambahkan event listener untuk tombol "Hapus Bentuk"
    $('#removeShape').on('click', removeShape);
});
