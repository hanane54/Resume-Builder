package com.resumebuilder.resumebuilder.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.resumebuilder.resumebuilder.model.Education;
import com.resumebuilder.resumebuilder.model.Experience;
import com.resumebuilder.resumebuilder.model.Resume;

import org.springframework.stereotype.Service;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class ResumePdfService {

    public byte[] generateResumePDF(Resume resume) throws IOException, DocumentException {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        PdfWriter.getInstance(document, out);
        document.open();

        Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18, BaseColor.BLACK);
        Font contentFont = FontFactory.getFont(FontFactory.HELVETICA, 12, BaseColor.BLACK);

        // Add Full Name
        Paragraph title = new Paragraph(resume.getFullName(), titleFont);
        title.setAlignment(Element.ALIGN_CENTER);
        document.add(title);

        document.add(new Paragraph("Email: " + resume.getEmail(), contentFont));
        document.add(new Paragraph("Phone: " + resume.getPhone(), contentFont));
        document.add(new Paragraph("Summary: " + resume.getSummary(), contentFont));

        document.add(new Paragraph("\nEducation:", titleFont));
        for (Education edu : resume.getEducation()) {
            document.add(new Paragraph(edu.getDegree() + " at " + edu.getInstitution(), contentFont));
        }

        document.add(new Paragraph("\nExperience:", titleFont));
        for (Experience exp : resume.getWorkExperience()) {
            document.add(new Paragraph(exp.getPosition() + " at " + exp.getCompanyName(), contentFont));
        }

        document.close();
        return out.toByteArray();
    }
}
