function Button(text, xLeft, yTop, width, height, click, fz) {
    this.xLeft = xLeft;
    this.yTop = yTop;
    this.width = width;
    this.height = height;
    this.text = text;
    this.onClick = function () {
        clickSound.play();
        click();
    };
    this.draw = function() {
        ctx.save();
        ctx.font = fz + 'px san-serif';
        if(this.height === 0) this.height = parseInt(ctx.font, 10);
        ctx.textBaseline = 'middle';
        ctx.textAlign = "center";
        ctx.fillStyle = '#f50';
        ctx.fillRect(this.xLeft, this.yTop, this.width, this.height);
        ctx.fillStyle = '#000';
        ctx.fillText(this.text, this.xLeft + (this.width / 2), this.yTop + (this.height / 2));
        ctx.restore();
    }
}