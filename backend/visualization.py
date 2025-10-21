import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import io
import base64

def generate_chart(dates, values, chart_type="line"):
    plt.clf()
    plt.figure(figsize=(6,4))
    if chart_type == "line":
        plt.plot(dates, values, marker="o")
        plt.xlabel("Date")
        plt.ylabel("Accesses")
        plt.title("Access Trend")
    elif chart_type == "bar":
        plt.bar(dates, values)
        plt.xlabel("Date")
        plt.ylabel("Accesses")
        plt.title("Access Trend")
    plt.tight_layout()
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    img_bytes = buf.read()
    buf.close()
    plt.close()
    b64 = base64.b64encode(img_bytes).decode("utf-8")
    return f"data:image/png;base64,{b64}"
