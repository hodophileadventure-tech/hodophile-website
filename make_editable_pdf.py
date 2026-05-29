#!/usr/bin/env python3
"""Create a single-page A4 PDF with the provided image as background
and AcroForm editable fields positioned to match the quotation layout.

Usage:
  python make_editable_pdf.py /path/to/input.jpg [out.pdf]

Installs:
  pip install reportlab pillow
"""
import sys
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.lib.units import mm


def mm2pt(value_mm: float) -> float:
    return value_mm * mm


def make_pdf(image_path: str, out_path: str = "hodophile-quotation.pdf") -> None:
    w, h = A4
    c = canvas.Canvas(out_path, pagesize=A4)

    # Draw background image to fill the page while preserving aspect ratio
    img = ImageReader(image_path)
    imgw, imgh = img.getSize()
    # scale to fit A4
    scale = min(w / imgw, h / imgh)
    draw_w = imgw * scale
    draw_h = imgh * scale
    x = (w - draw_w) / 2
    y = (h - draw_h) / 2
    c.drawImage(img, x, y, width=draw_w, height=draw_h, preserveAspectRatio=True, mask='auto')

    form = c.acroForm

    # Top-right: Quote # and Quote Date
    form.textfield(name='quote_no', x=w - mm2pt(60), y=h - mm2pt(66), width=mm2pt(48), height=mm2pt(8),
                   borderStyle='underlined', value='')
    form.textfield(name='quote_date', x=w - mm2pt(60), y=h - mm2pt(76), width=mm2pt(48), height=mm2pt(8),
                   borderStyle='underlined', value='')

    # Top-left: To / Customer box
    form.textfield(name='to_name', x=mm2pt(15), y=h - mm2pt(70), width=mm2pt(95), height=mm2pt(28),
             borderStyle='underlined', value='', fieldFlags=4096)

    # Table area - one row fields (duplicate as needed)
    # Adjust Y positions if your template differs slightly
    row_y = h - mm2pt(125)
    form.textfield(name='item_1_desc', x=mm2pt(15), y=row_y, width=mm2pt(110), height=mm2pt(10),
                   borderStyle='underlined', value='')
    form.textfield(name='item_1_price', x=mm2pt(130), y=row_y, width=mm2pt(25), height=mm2pt(10),
                   borderStyle='underlined', value='')
    form.textfield(name='item_1_qty', x=mm2pt(160), y=row_y, width=mm2pt(18), height=mm2pt(10),
                   borderStyle='underlined', value='')
    form.textfield(name='item_1_amount', x=mm2pt(180), y=row_y, width=mm2pt(35), height=mm2pt(10),
                   borderStyle='underlined', value='')

    # Notes and package included area (left lower table)
    form.textfield(name='notes', x=mm2pt(15), y=h - mm2pt(170), width=mm2pt(95), height=mm2pt(35),
             borderStyle='underlined', value='', fieldFlags=4096)

    # Right table: Subtotal, Total, Amount Paid, Quote
    form.textfield(name='subtotal', x=w - mm2pt(55), y=h - mm2pt(145), width=mm2pt(45), height=mm2pt(10),
                   borderStyle='underlined', value='')
    form.textfield(name='total', x=w - mm2pt(55), y=h - mm2pt(160), width=mm2pt(45), height=mm2pt(10),
                   borderStyle='underlined', value='')
    form.textfield(name='amount_paid', x=w - mm2pt(55), y=h - mm2pt(130), width=mm2pt(45), height=mm2pt(10),
                   borderStyle='underlined', value='')
    form.textfield(name='quote_total', x=w - mm2pt(55), y=h - mm2pt(115), width=mm2pt(45), height=mm2pt(10),
                   borderStyle='underlined', value='')

    c.save()
    print('WROTE', out_path)


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python make_editable_pdf.py /path/to/input.jpg [out.pdf]')
        sys.exit(1)
    image = sys.argv[1]
    outp = sys.argv[2] if len(sys.argv) > 2 else 'hodophile-quotation.pdf'
    make_pdf(image, outp)
