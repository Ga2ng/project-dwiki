<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ChangeHargaColumnInProduksTable extends Migration
{
    public function up()
    {
        Schema::table('produks', function (Blueprint $table) {
            $table->unsignedBigInteger('harga')->change();
        });
    }

    public function down()
    {
        Schema::table('produks', function (Blueprint $table) {
            $table->bigInteger('harga')->change();
        });
    }
}
