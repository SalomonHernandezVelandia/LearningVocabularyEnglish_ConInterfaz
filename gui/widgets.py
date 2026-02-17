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