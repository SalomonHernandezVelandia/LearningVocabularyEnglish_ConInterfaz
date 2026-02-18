import customtkinter as ctk

def titulo(self, tex):
    self.title_label = ctk.CTkLabel(
        self.right_panel,
        text=tex,
        font=ctk.CTkFont(size=30, weight="bold")
    )
    self.title_label.pack(pady=(30, 10), padx=40, fill="x")


def message_start(self, msg):
    self.info_label = ctk.CTkLabel(
        self.right_panel,
        text=msg,
        justify="center",
        font=ctk.CTkFont(size=15)
    )
    self.info_label.pack(pady=(10, 30), padx=40, fill="x")


def buttons_irregulars(self, txt, mode):
    ctk.CTkButton(
        self.right_panel,
        text=txt,
        font=ctk.CTkFont(size=15),
        command=lambda: self.select_irregular_mode(mode)
    ).pack(pady=15)


def statistics_section(self):
    if hasattr(self, "stats_frame"): # Eliminar si ya existe
        self.stats_frame.destroy()

    # Tarjeta principal
    self.stats_frame = ctk.CTkFrame(
        self.left_panel,
        corner_radius=15,
        fg_color=("gray86", "gray17"),
        border_width=2,
        border_color=("#FFA500", "#FF8C00")
    )
    self.stats_frame.pack(side="bottom", pady=20, padx=15, fill="x")

    # Encabezado con fondo naranja
    header = ctk.CTkFrame(
        self.stats_frame,
        corner_radius=10,
        fg_color=("#FFA500", "#FF8C00")
    )
    header.pack(fill="x", padx=10, pady=(10, 5))

    ctk.CTkLabel(
        header,
        text="📊 PUNTAJE",
        font=ctk.CTkFont(size=16, weight="bold"),
        text_color="#DCE4EE"
    ).pack(pady=5)

    # Progreso
    progress_value = self.current_round / self.total_rounds

    self.progress = ctk.CTkProgressBar(self.stats_frame)
    self.progress.set(progress_value)
    self.progress.pack(fill="x", padx=20, pady=(10, 5))

    # Porcentaje
    percentage = int(progress_value * 100)

    ctk.CTkLabel(
        self.stats_frame,
        text=f"Progreso: {percentage}%",
        font=ctk.CTkFont(size=14)
    ).pack(pady=(0, 10))

    # Mini contenedor para estadísticas
    stats_container = ctk.CTkFrame(
        self.stats_frame,
        fg_color="transparent"
    )
    stats_container.pack(pady=(5, 15), padx=15, fill="x")

    # Correctas
    ctk.CTkLabel(
        stats_container,
        text=f"✅ Correctas: {self.correct_count}",
        font=ctk.CTkFont(size=15, weight="bold"),
        text_color="#2ECC71"
    ).pack(anchor="w", pady=2)

    # Incorrectas
    ctk.CTkLabel(
        stats_container,
        text=f"❌ Incorrectas: {self.incorrect_count}",
        font=ctk.CTkFont(size=15, weight="bold"),
        text_color="#E74C3C"
    ).pack(anchor="w", pady=2)

    # Ronda actual
    ctk.CTkLabel(
        stats_container,
        text=f"🔤 Palabra: {self.current_round}/{self.total_rounds}",
        font=ctk.CTkFont(size=14)
    ).pack(anchor="w", pady=2)

