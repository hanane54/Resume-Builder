import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const TemplateCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(44, 62, 80, 0.15);
  }
`;

const TemplatePreview = styled.div`
  height: 400px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const TemplateInfo = styled.div`
  padding: 1.5rem;
  background-color: white;
`;

const TemplateTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const TemplateDescription = styled.p`
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const SelectButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #34495e;
  }
`;

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'A clean and modern design perfect for tech professionals',
    preview: 'Modern template preview'
  },
  {
    id: 'classic',
    name: 'Classic Elegant',
    description: 'A timeless design suitable for any industry',
    preview: 'Classic template preview'
  }
];

const ResumeTemplates = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const handleTemplateSelect = (templateId) => {
    navigate(`/resume-preview/${resumeId}/${templateId}`);
  };

  return (
    <Container>
      <Title>Choose Your Resume Template</Title>
      <TemplatesGrid>
        {templates.map((template) => (
          <TemplateCard key={template.id} onClick={() => handleTemplateSelect(template.id)}>
            <TemplatePreview>
              {template.preview}
            </TemplatePreview>
            <TemplateInfo>
              <TemplateTitle>{template.name}</TemplateTitle>
              <TemplateDescription>{template.description}</TemplateDescription>
              <SelectButton>Select Template</SelectButton>
            </TemplateInfo>
          </TemplateCard>
        ))}
      </TemplatesGrid>
    </Container>
  );
};

export default ResumeTemplates; 