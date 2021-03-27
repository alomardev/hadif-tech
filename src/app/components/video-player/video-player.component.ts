import { Component, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { Player, PlayerOptions } from 'videojs';

declare const videojs: typeof import('videojs');

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy, OnChanges {

  @HostBinding('class.video-player') videoPlayerClassName = true;

  @ViewChild('videoElement', { static: true }) videoElement: ElementRef;

  player: Player;

  @Input() source: string;

  constructor() { }

  ngOnInit(): void {
    this.player = videojs(this.videoElement.nativeElement, { autoplay: false }, () => {
      this.setSource(this.source);
    });
  }

  ngOnDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.source) {
      this.setSource(this.source, !changes.source.firstChange);
    }
  }

  private setSource(src: string, autoplay = false) {
    if (this.player && src) {
      this.player.src(src);
      this.play().catch(() => {});
    }
  }

  private async play() {
    return this.player.play();
  }

}
