<?php

if (isset($argv)) {
    $directory = $argv[1];
    $files = scandir(__DIR__ . "/../$directory");
    if ($files) {
        $m3u8 = "#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-MEDIA-SEQUENCE:0\n#EXT-X-TARGETDURATION:10\n\n";
        foreach ($files as $file)
            if (str_ends_with($file, '.mp3')) {
                $m3u8 .= "#EXTINF:10.000000,\n$file\n";
            }
        $m3u8 .= "#EXT-X-ENDLIST";
        file_put_contents(__DIR__ . "/../$directory/track.m3u8", $m3u8);
    }
}


// ffmpeg -i Obestocheno.mp3 -profile:v baseline -level 3.0 -start_number 0 -hls_time 10 -hls_list_size 0 -f hls  obestocheno/track.m3u8